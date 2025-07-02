import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 drop-shadow">Bem-vindo(a) à plataforma!</h2>
      <p className="text-lg text-blue-800 mb-2">Escolha uma opção no menu lateral para começar.</p>
      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-medium shadow">Gestão de Alunos</span>
        <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-medium shadow">Doações</span>
        <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-medium shadow">Voluntários</span>
        <span className="bg-blue-100 text-blue-900 px-4 py-2 rounded-full font-medium shadow">Relatórios</span>
      </div>
    </div>
  );
}
