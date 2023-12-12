import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// imports dos componentes de página
import HomePage from "../pages/HomePage/HomePage";
import TipoEventos from "../pages/TipoEventosPage/TipoEventosPage";
import EventosPage from "../pages/EventosPage/EventosPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import TestePage from "../pages/TestePage/TestePage";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";
import EventosAlunoPage from "../pages/EventosAlunoPage/EventosAlunoPage";

// Componente Rota
const Rotas = () => {
  return (
    <div>
      <BrowserRouter>
       <Header />
        
        <Routes>
          <Route element={<HomePage />} path="/" exact />

          <Route 
          path="/tipo-eventos"
          element={
            
            <PrivateRoute redirectTo="/"> 
             <TipoEventos />
            </PrivateRoute>
          }
          />

          <Route 
          path="/eventos-aluno"
          element={
            
            <PrivateRoute redirectTo="/"> 
             <EventosAlunoPage /> 
            </PrivateRoute>
          }
          />

          <Route element={<EventosPage />} path="/eventos" />

          <Route element={<LoginPage />} path="/login" />
          <Route element={<TestePage />} path="/testes" />
        </Routes>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default Rotas;
