import React from "react";

export default function RelatorioAlunos() {
  return (
    <div className="p-4 bg-white min-h-screen text-blue-900">
      <h2 className="text-lg font-bold">Relatório de Alunos</h2>
      <p>Filtrar por grupo e/ou idade</p>
      <input placeholder="Grupo ou Turma" className="border p-2 w-full" /><br />
      <input placeholder="Idade" type="number" className="border p-2 w-full" /><br />
      <button className="bg-blue-900 text-white p-2 rounded">Gerar Relatório</button>
    </div>
  );
}
