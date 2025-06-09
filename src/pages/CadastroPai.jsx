// src/pages/CadastroPai.jsx
import React from "react";
import "../styles/Form.css";

export default function CadastroPai() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pai cadastrado com sucesso! (Simulado)");
  };

  return (
    <div className="form-container">
      <h2>Cadastro de Pai/Responsável</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome do Pai" required />
        <input type="text" placeholder="Nome da Mãe" />
        <input type="tel" placeholder="Telefone" required />
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Endereço" />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}