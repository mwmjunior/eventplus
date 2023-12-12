import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import MainContent from "../../components/Main/MainContent";
import Title from "../../components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../components/Container/Container";
import { Select } from "../../components/FormComponents/FormComponents";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import api, {
  eventsResource,
  myEventsResources,
  presencesEventResources,
  commentaryEventResources,
} from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../components/context/AuthContext";

const EventosAlunoPage = () => {
  // state do menu mobile
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: 1, text: "Todos os eventos" },
    { value: 2, text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState(""); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [comentario, setComentario] = useState("");

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  console.log(userData);

  async function loadEventsType() {
    setShowSpinner(true);
    // setEventos([]); // zera os array de eventos
    if (tipoEvento === "1") {
      // chamar a api todos os eventos (Evento)

      try {
        // Listar os eventos (Eventos)
        const todosEventos = await api.get(eventsResource);
        const MeusEventos = await api.get(
          `${myEventsResources}/${userData.userId}`
        );
        const eventosMarcados = verificaPresenca(
          todosEventos.data,
          MeusEventos.data
        );
        setEventos(eventosMarcados);
        console.clear();

        console.log("Todos Eventos");
        console.log(todosEventos.data);

        console.log("Meus Eventos");
        console.log(MeusEventos.data);

        console.log("Eventos Marcados:");
        console.log(eventosMarcados);
      } catch (error) {
        //colocar notification
        console.log("Erro na Api");
        console.log(error);
      }
    } else if (tipoEvento === "2") {
      // Lista os meus eventos (PresencasEventos)
      //retorna um formato diferente de array

      try {
        const retornoEventos = await api.get(
          `${myEventsResources}/${userData.userId}`
        );

        const arrEventos = []; //array vazio

        retornoEventos.data.forEach((e) => {
          arrEventos.push(
            // Passa todas as propriedades de evento adicionado a situacao
            {
              ...e.evento,
              situacao: e.situacao,
              idPresencaEvento: e.idPresencaEvento,
            }
          );
        });

        // console.log(arrEventos);

        setEventos(arrEventos);
        // setEventos(retornoEventos.data)
        console.log(retornoEventos.data);
        setEventos(arrEventos);
      } catch (error) {
        //colocar notification
        console.log("Erro na API");
        console.log(error);
      }
    } else {
      setEventos([]);
    }

    setShowSpinner(false);
  }

  //Roda no carregamanto da pagina sempre que o tipo de evento for alterado
  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, setUserData]);

  const verificaPresenca = (arraAllEvents, eventsUser) => {
    for (let x = 0; x < arraAllEvents.leght; x++) {
      // para cada evento
      for (let i = 0; i < eventsUser.leght; i++) {
        // procurar a correspondencia
        if (arraAllEvents[x].idEventos === eventsUser[i].evento.idEvento) {
          arraAllEvents[x].situacao = true;
          //arrumar
          arraAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break; // paro de procurar para o evento princial atual
        }
      }
    }

    // retorna todos os eventos marcados com a presenca do usuario
    return arraAllEvents;
  };

  // Criar uma funcao para trazer os eventos do aluno todos eventos

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }

  const loadMyComentary = async(idUsuario, idEvento) => {

    const promise = await api.get(`${commentaryEventResources}?idUsuario=${idUsuario}&idEvento=${idEvento}`);
    console.log(promise.data);
    console.log(idUsuario, idEvento)
    setComentario(promise.data)
  }

  async function postMyComentary() {
    return "????";
  }

  const showHideModal = (idEvent) => {
    setShowModal(showModal ? false : true);
    setUserData({ ...userData, idEvento: idEvent });
  };

  const commentaryRemove = () => {
    alert("Remover o comentário");
  };

  async function handleConnect(eventId, whatTheFunction, presencaId = null) {
    if (whatTheFunction === "connect") {
      try {
        const promisse = await api.post(presencesEventResources, {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: eventId,
        });

        if (promisse.status === 201) {
          alert("Presenca confirmada, parabens");

          // const todosEventos = api.get(eventsResource);
          // setEventos(todosEventos.data);

          loadEventsType();
        }
      } catch (error) {}
      alert("Conectar ao evento:" + eventId);
      return;
    }

    // alert("Desenvolver a função conectar evento");

    console.clear();
    console.log(`
    
    DESCONECTAR
    ${whatTheFunction}
    ${presencaId}
    
    `);

    // unconnect - api seria o else

    try {
      const unconnect = await api.delete(
        `${presencesEventResources}/${presencaId}`
      );
      if (unconnect.status === 204) {
        // alert("Desconectado do evento");
        // const todosEventos = await api.get(eventsResource);
        // setEventos(todosEventos.data);
        loadEventsType();
      }
    } catch (error) {}
  }

  return (
    <>
      {/* <Header exibeNavbar={exibeNavbar} setExibeNavbar={setExibeNavbar} /> */}

      <MainContent>
        <Container>
          <Title titleText={"Eventos"} className="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            options={quaisEventos} // aqui o array dos tipos
            fnManipulator={(e) => {
              myEvents(e.target.value);
            }} // aqui só a variável state
            value={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyComentary}
          fnPost={postMyComentary}
          fnDelete={commentaryRemove}
          comentaryText={comentario}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
