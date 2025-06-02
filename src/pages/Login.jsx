// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simula autenticação e salva no localStorage
    localStorage.setItem("usuarioLogado", JSON.stringify({ nome: "Usuário" }));

    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="top-bar">
        <img src={logo} alt="Logo UniSales" className="logo-topo" />
      </div>

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Usuário" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
      </div>

      <div className="bottom-bar">
        <p>&copy; Inspetoria São João Bosco - Todos os direitos reservados.</p>
      </div>
    </div>
  );
}

