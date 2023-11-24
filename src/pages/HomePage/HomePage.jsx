import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomePage.css";


import MainContent from "../../components/Main/MainContent";
import Banner from "../../components/Banner/Banner";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import Container from "../../components/Container/Container";
import api from "../../Services/Service"

const HomePage = () => {
  // const urlGetAPI = "https://localhost:7118/api";
  const [nextEvents, setNextEvents] = useState([]); //dados mocados

  {
    useEffect(() => {
      //roda somente na inicialização do componente
      async function getNextEvents() {
        try {
          // const promise = await axios.get(`${urlGetAPI}/Evento/ListarProximos`);

          const promise = await api.get("/Evento/ListarProximos");
          // const promise = await api.get("/Evento/ListarProximos");

          const dados = await promise.data;

          setNextEvents(dados);
        } catch (error) {
          alert("erro");
        }
      }

      getNextEvents(); //roda a função
    }, []);
  }

  return (
    <MainContent>
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />

          <div className="events-box">
            {nextEvents.map((event) => {
              return (  
                <NextEvent
                  id={event.id}
                  eventDate={event.dataEvento}
                  title={event.nomeEvento}
                  description={event.descricao}
                  idEvent={event.idEvento}
                />
              );
            })}
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;