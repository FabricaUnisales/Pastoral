import React from "react";

export default function RelatorioAlunos() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-xl mx-auto mt-10 text-blue-900">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">📘 Relatório de Alunos</h2>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Grupo ou Turma </label>
          <input
            type="text"
            placeholder="Digite a turma..."
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Idade </label>
          <input
            type="number"
            placeholder="Digite a idade..."
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-bold py-2 rounded-md shadow-md hover:brightness-110 transition duration-300"
        >
          📄 Gerar Relatório
        </button>
      </form>
    </div>
  );
}
