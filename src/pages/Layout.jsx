import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "../styles/Layout.css";
import logo from "../assets/logo.png"; // Corrigido para importar corretamente

export default function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <img src={logo} alt="Logo UniSales" className="logo-sidebar" />

        <nav className="nav-links">
          <Link to="/home">Início</Link>
          <Link to="/cadastro-voluntario">Cadastro Voluntário</Link>
          <Link to="/cadastro-doacao">Cadastro Doação</Link>
          <Link to="/cadastro-aluno">Cadastro Aluno</Link>
          <Link to="/chamada">Chamada</Link>
          <Link to="/relatorio-doacoes">Relatório Doações</Link>
          <Link to="/relatorio-alunos">Relatório Alunos</Link>
          <Link to="/cadastro-pai">Cadastro Pai</Link>
          <Link to="/listar-alunos">Listar Alunos</Link>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Sair
        </button>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

