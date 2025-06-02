import React from "react";

export default function CadastroVoluntario() {
  return (
    <div className="p-4 bg-white min-h-screen text-blue-900">
      <h2 className="text-lg font-bold">Cadastro de Voluntário</h2>
      <form className="space-y-2">
        <input placeholder="Nome" className="border p-2 w-full" /><br />
        <input placeholder="CPF" className="border p-2 w-full" /><br />
        <input placeholder="RG" className="border p-2 w-full" /><br />
        <input placeholder="Telefone" className="border p-2 w-full" /><br />
        <input placeholder="Endereço" className="border p-2 w-full" /><br />
        <button className="bg-blue-900 text-white p-2 rounded">Salvar</button>
      </form>
    </div>
  );
}
