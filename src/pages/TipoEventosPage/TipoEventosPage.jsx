import "./TipoEventosPage.css";
import MainContent from "../../components/Main/MainContent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import ImageIllustrator from "../../components/ImageIlustrator/ImageIlustrator";
import tipoEventoImage from "../../assets/images/tipo-evento.svg";
import React, { useEffect, useState } from "react";
import { Input, Button } from "../../components/FormComponents/FormComponents";
import api, { eventsTypeResource } from "../../Services/Service";
import TableTp from "./TableTP/TableTP";
import Notification from "../../components/Notification/Notification";
import Spinner from "../../components/Spinner/Spinner";

const TipoEventosPage = () => {
  // states
  const [frmEdit, setFrmEdit] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [idEvento, setidEvento] = useState(null); //para editar por causa do evento
  const [tipoEventos, setTipoEventos] = useState([]); //array
  const [notifyUser, setNotifyUser] = useState(); //componente notification
  const [showSpinner, setshowSpinner] = useState(false); //componente spinner


  const [nomeEvento,  setNomeEvento] = useState("");
  const [dataEvento,  setDataEvento] = useState();
  const [descricao, setDescricao] = useState("");
  


  useEffect(() => {
    // define a chamada em nossa api
    async function loadEventsType() {
      try {
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);
        console.log(retorno.data);
      } catch (error) {
        console.log("Erro na api");
        console.log(error);
      }
    }
    // chama a função/api no carregamento da página/componente
    loadEventsType();
  }, []);

  /***********CADASTRAR**** */

  async function handleSubmit(e) {
    e.preventDefault(); //evita o submit do formulário
    if (titulo.trim().length < 3) {
      setNotifyUser({
        titleNote: "Aviso",
        textNote: "O título deve ter pelo menos 3 caracteres",
        imgIcon: "warning",
        imgAlt:
          "Imagem de ilustração de aviso. Moça em frente a um símbolo de exclamação",
        showMessage: true,
      });
      return;
    }

    try {
      const retorno = await api.post(eventsTypeResource, {
        titulo: titulo,
      });
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: "Titulo Cadastrado com sucesso",
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação",
        showMessage: true,
      });

      
       //limpa o state
       setNomeEvento('');
       setDescricao('');
       setDataEvento('');
       

      //atualiza os dados na api.
      setTitulo(titulo);
      const response = await api.get(eventsTypeResource);
      setTipoEventos(response.data);

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
    }
  }
  //atualiza a tela

  /********************* EDITAR CADASTRO *********************/
  // mostra o formulário de edição
  async function showUpdateForm(idElement) {
    setFrmEdit(true);
    setidEvento(idElement); //id do elemento para poder atualizar
    try {
      const retorno = await api.get(`${eventsTypeResource}/${idElement}`);
      setTitulo(retorno.data.titulo);
      console.log(retorno.data);
    } catch (error) {}
  }
  // cancela a tela/ação de edição (volta para o form de cadastro)
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setidEvento(null);
  }
  // cadastrar a atualização na api
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      //atualizar na api
      const retorno = await api.put(eventsTypeResource + "/" + idEvento, {
        titulo: titulo,
      }); //o id está no state
      if (retorno.status === 204) {
        //notificar o usúario
        setNotifyUser({
          titleNote: "Aviso",
          textNote: "Cadastro atuzalizado com sucesso",
          imgIcon: "success",
          imgAlt:"Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação",
          showMessage: true,
        });

        //atualizar os dados na tela
        const retorno = await api.get(eventsTypeResource);
        setTipoEventos(retorno.data);

        //volta para a tela de cadastro
        editActionAbort();
      }
    } catch (error) {
      //notificar o erro ao usúario
      setNotifyUser({
        titleNote: "Erro",
        textNote: "erro ao Atualizar, por favor verifique a conexão",
        imgIcon: "danger",
        imgAlt: "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de x",
        showMessage: true,
      });
    }
  }

  /****************APAGAR******************** */
  async function handleDelete(idElement) {
    try {
      const promise = await api.delete(`${eventsTypeResource}/${idElement}`);
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

          const buscaEventos = await api.get(eventsTypeResource);

          setTipoEventos(buscaEventos.data);
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
  return (
    <>
      <MainContent>
        {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}


        {/* formulário de cadastro do tipo do evento */}
        <section className="cadastro-evento-section">
          <Container>
            <div className="cadastro-evento__box">
              <Title titleText={"Cadastro Tipo de Eventos"} />

              <ImageIllustrator imageRender={tipoEventoImage} />

              <form
                className="ftipo-evento"
                onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                {/* cadastrar ou editar? */}
                {!frmEdit ? (
                  // Cadastrar
                  <>
                    <Input
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      fnManipulator={(e) => {
                        setTitulo(e.target.value);
                      }}
                    />
                    <Button
                      textButton="Cadastrar"
                      id="cadastrar"
                      name="cadastrar"
                      type="submit"
                    />
                    <div className="buttons-editbox"></div>
                  </>
                ) : (
                  // Editar
                  <>
                  <Input
                      id="Titulo"
                      placeholder="Título"
                      name={"titulo"}
                      type={"text"}
                      required={"required"}
                      value={titulo}
                      fnManipulator={(e) => {
                        setTitulo(e.target.value);
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
                      fnManipulator={editActionAbort}
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
            <Title titleText={"Lista Tipo de Eventos"} color="white" />

            <TableTp
              dados={tipoEventos}
              fnUpdate={showUpdateForm}
              fnDelete={handleDelete}
            />
          </Container>
        </section>
      </MainContent>
    </>
  );
};

export default TipoEventosPage;
