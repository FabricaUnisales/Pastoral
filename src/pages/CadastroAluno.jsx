import React from "react";

export default function CadastroAluno() {
  return (
    <div className="p-4 bg-white min-h-screen text-blue-900">
      <h2 className="text-lg font-bold">Cadastro de Aluno</h2>
      <form className="space-y-2">
        <input placeholder="Nome" className="border p-2 w-full" /><br />
        <input placeholder="Gênero" className="border p-2 w-full" /><br />
        <input type="date" placeholder="Nascimento" className="border p-2 w-full" /><br />
        <input placeholder="Escola" className="border p-2 w-full" /><br />
        <input placeholder="Série" className="border p-2 w-full" /><br />
        <input placeholder="Responsável" className="border p-2 w-full" /><br />
        <button className="bg-blue-900 text-white p-2 rounded">Salvar</button>
      </form>
    </div>
  );
}
