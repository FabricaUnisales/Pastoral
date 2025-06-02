import React from "react";

export default function CadastroDoacao() {
  return (
    <div className="p-4 bg-white min-h-screen text-blue-900">
      <h2 className="text-lg font-bold">Cadastro de Doação</h2>
      <form className="space-y-2">
        <select className="border p-2 w-full">
          <option>Roupa</option>
          <option>Comida</option>
          <option>Brinquedo</option>
        </select><br />
        <input type="date" className="border p-2 w-full" /><br />
        <button className="bg-blue-900 text-white p-2 rounded">Salvar</button>
      </form>
    </div>
  );
}
