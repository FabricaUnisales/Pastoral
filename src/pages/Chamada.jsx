import React from "react";

export default function Chamada() {
  return (
    <div className="p-4 bg-white min-h-screen text-blue-900">
      <h2 className="text-lg font-bold">Chamada</h2>
      <p>Leitura de QR Code para registrar presença</p>
      <button className="bg-blue-900 text-white p-2 rounded">Iniciar Leitura QR Code</button>
    </div>
  );
}
