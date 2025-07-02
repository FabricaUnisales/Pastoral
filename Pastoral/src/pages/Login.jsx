// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("usuarioLogado", JSON.stringify({ nome: "Usuário" }));
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <img src={logo} alt="Logo UniSales" className="w-32 mb-6" />
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Bem-vindo(a)</h2>
        <p className="text-blue-800 mb-6 text-center">Acesse a plataforma para gerenciar a Pastoral</p>
        <form onSubmit={handleSubmit} className="w-full space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            required
            className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
          />
          <input
            type="password"
            placeholder="Senha"
            required
            className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
          />
          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-800 transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
      <div className="mt-8 text-blue-900 text-sm opacity-80">
        &copy; Inspetoria São João Bosco - Todos os direitos reservados.
      </div>
    </div>
  );
}

