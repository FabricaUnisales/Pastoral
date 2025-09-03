import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import CadastroAluno from "./pages/CadastroAluno";
import CadastroDoacao from "./pages/CadastroDoacao";
import CadastroVoluntario from "./pages/CadastroVoluntario";
import Chamada from "./pages/Chamada";
import RelatorioAlunos from "./pages/RelatorioAlunos";
import RelatorioDoacoes from "./pages/RelatorioDoacoes";

import ListarAlunos from "./pages/ListarAlunos";
import Carteirinhas from "./pages/Carteirinhas";

export default function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Todas as rotas abaixo aparecem com o Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="cadastro-aluno" element={<CadastroAluno />} />
          <Route path="cadastro-doacao" element={<CadastroDoacao />} />
          <Route path="cadastro-voluntario" element={<CadastroVoluntario />} />
          <Route path="chamada" element={<Chamada />} />
          <Route path="relatorio-alunos" element={<RelatorioAlunos />} />
          <Route path="relatorio-doacoes" element={<RelatorioDoacoes />} />

          <Route path="listar-alunos" element={<ListarAlunos />} />
          <Route path="carteirinhas" element={<Carteirinhas />} />
        </Route>
      </Routes>
    </Router>
  );
}