import React, { useEffect, useState } from "react";
import "./EventosPage.css";
import Title from "../../components/Title/Title";
import ImageIllustrator from "../../components/ImageIlustrator/ImageIlustrator";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import eventoImage from "../../assets/images/evento.svg";
import {
  Select,
  Input,
  Button,
} from "../../components/FormComponents/FormComponents";
import api, {
  eventsTypeResource,
  eventsResource,
} from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import TableEvento from "../EventosPage/TableEvento/TableEvento";

const EventosPage = () => {
  //States
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [idEvento, setIdEvento] = useState([]);
  const [tipoEvento, setTipoEvento] = useState([]);
  const [idTipoEvento, setIdTipoEvento] = useState(null);
  const [eventos, setEventos] = useState([]);
  const [dataEvento, setDataEvento] = useState();
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [notifyUser, setNotifyUser] = useState(); //componente notification
  const idInstituicao = "4558fe2f-4c1f-4cca-812f-8aa2b3511d9e";

  useEffect(() => {
    // define a chamada em nossa api
    //Declaração de uma função assíncrona chamada "loadEventsType" para carregar os eventos.
    async function loadEvents() {
      try {
        const retorno = await api.get(eventsResource);
        setEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
    }
    // chama a função/api no carregamento da página/componente
    loadEvents();
  }, []);

  useEffect(() => {
    // define a chamada em nossa api
    //Declaração de uma função assíncrona chamada "loadEventsType" para carregar os tipos de evento.
    async function loadEventsType() {
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEvento(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
    }
    // chama a função/api no carregamento da página/componente
    loadEventsType();
  }, []);

  // Depara - pega o retorno da api e jogar em uma array
  function dePara(retornoApi) {
    let arrayOptions = [];
    retornoApi.forEach((e) => {
      arrayOptions.push({ value: e.idTipoEvento, text: e.titulo });
    });
    return arrayOptions;
  }

  //*****Cadastrar Evento******* */
  async function handleSubmit(e) {
    e.preventDefault(); //evita o submit do formulário

    try {
      //cadastra na api
      const retorno = await api.post(eventsResource, {
        nomeEvento: nomeEvento,
        descricao: descricao,
        idTipoEvento: idTipoEvento,
        dataEvento: dataEvento,
        idInstituicao: idInstituicao
      });
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Evento Cadastrado com sucesso",
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação",
        showMessage: true,
      });

      if (retorno.status === 201) {
        //atualiza os dados na api.
        const response = await api.get(eventsResource);
        setEventos(response.data);
      }

      console.log(retorno);
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: `deu ruim no submit`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
        showMessage: true,
      });

      console.log(error);
    }
  }

  /****Editar evento */
  async function handleUpdate(e) {
    e.preventDefault();

    const retorno = await api.put(eventsResource + "/" + idEvento, {
      nomeEvento: nomeEvento,
      descricao: descricao,
      dataEvento: dataEvento,
    });
    try {
      if (retorno.status === 204) {
        //notificar o usúario
        setNotifyUser({
          titleNote: "Aviso",
          textNote: "Cadastro atuzalizado com sucesso",
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação",
          showMessage: true,
        });
        //atualizar os dados na tela
        const retorno = await api.get(eventsResource);
        setEventos(retorno.data);
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "Erro",
        textNote: "erro ao Atualizar, por favor verifique a conexão",
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
        showMessage: true,
      });
    }
  }

  //*****Apagar Evento******* */

  async function handleDelete(idElement) {
    try {
      //promise que chama a rota delete passando o id do evento
      const promise = await api.delete(`${eventsResource}/${idElement}`);
      //condição com mensagem para confirmar a exclusão
      if (window.confirm("confirma a exclusão?")) {
        if (promise.status === 204) {
          setNotifyUser({
            titleNote: "Exclusão",
            textNote: `Evento apagado com sucesso`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
            showMessage: true,
          });

          //atualiza os dados da api dando um get
          const buscaEventos = await api.get(eventsResource);

          setEventos(buscaEventos.data);
        }
      }
    } catch (error) {
      setNotifyUser({
        titleNote: "erro",
        textNote: `problema ao apagar,verifique a conexão`,
        imgIcon: "danger",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
        showMessage: true,
      });
    }
  }

  // Sessão do HTML
  return (
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      {/* TITULO E IMAGEM DA PAGINA */}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Cadastro de Eventos"} />

            <ImageIllustrator imageRender={eventoImage} />

            {/* FORMULARIO DE CADASTRO */}
            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                <>
                  {/*cadastrar */}
                  <Input
                    id="nomeEvento"
                    placeholder="Nome"
                    name={"nomeEvento"}
                    type={"text"}
                    required={"required"}
                    value={nomeEvento}
                    fnManipulator={(e) => {
                      setNomeEvento(e.target.value);
                    }}
                  />
                  <Input
                    id="descricao"
                    placeholder="Descrição"
                    name={"descricao"}
                    type={"text"}
                    required={"required"}
                    value={descricao}
                    fnManipulator={(e) => {
                      setDescricao(e.target.value);
                    }}
                  />
                  <Select
                    id="tipoEvento"
                    name="tipoEvento"
                    placeholder="Tipo de Evento"
                    options={dePara(tipoEvento)}
                    value={idTipoEvento}
                    required={"required"}
                    fnManipulator={(e) => {
                      setIdTipoEvento(e.target.value);
                    }}
                  />
                  <Input
                    id="dataEvento"
                    placeholder="Data"
                    name={"Data"}
                    type={"date"}
                    required={"required"}
                    value={dataEvento}
                    fnManipulator={(e) => {
                      setDataEvento(e.target.value);
                    }}
                  />
                  <Button
                    textButton="Cadastrar"
                    id="cadastrar"
                    name="cadastrar"
                    type="submit"
                  />
                </>
              ) : (
                //  editar
                <>
                  <Input
                    id="nomeEvento"
                    placeholder="Nome"
                    name={"nomeEvento"}
                    type={"text"}
                    required={"required"}
                    value={nomeEvento}
                    fnManipulator={(e) => {
                      setNomeEvento(e.target.value);
                    }}
                  />
                  <Input
                    id="descricao"
                    placeholder="Descrição"
                    name={"descricao"}
                    type={"text"}
                    required={"required"}
                    value={descricao}
                    fnManipulator={(e) => {
                      setDescricao(e.target.value);
                    }}
                  />
                  <Select
                    id="tipoEvento"
                    name="tipoEvento"
                    placeholder="Tipo de Evento"
                    options={dePara(tipoEvento)}
                    value={idTipoEvento}
                    required={"required"}
                    fnManipulator={(e) => {
                      setIdTipoEvento(e.target.value);
                    }}
                  />
                  <Input
                    id="dataEvento"
                    placeholder="Data"
                    name={"Data"}
                    type={"date"}
                    required={"required"}
                    value={dataEvento}
                    fnManipulator={(e) => {
                      setDataEvento(e.target.value);
                    }}
                  />
                  <div className="buttons-editbox">
                    <Button
                      textButton="Atualizar"
                      id="atualizar"
                      name="atualizar"
                      type="submit"
                      additionalClass="button-component--middle"
                    />

                    <Button
                      textButton="Cancelar"
                      id="Cancelar"
                      name="Cancelar"
                      type="button"
                      // manipulationFunction={editActionAbort}
                      additionalClass="button-component--middle"
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>
      {/* Listagem de tipo de eventos */}
      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Eventos"} color="white" />

          <TableEvento
            dados={eventos}
            // fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default EventosPage;
