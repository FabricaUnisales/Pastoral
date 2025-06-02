import React from "react";

export default function RelatorioDoacoes() {
  return (
    <div className="p-4 bg-white min-h-screen text-blue-900">
      <h2 className="text-lg font-bold">Relatório de Doações</h2>
      <p>Filtrar por período de tempo</p>
      <input type="date" className="border p-2 w-full" /> até <input type="date" className="border p-2 w-full" /><br />
      <button className="bg-blue-900 text-white p-2 rounded">Gerar Relatório</button>
    </div>
  );
}
