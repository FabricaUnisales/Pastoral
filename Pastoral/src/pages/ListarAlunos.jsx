import React, { useState, useEffect } from "react";
import { alunoService } from "../services/api";
import "../styles/Table.css";

export default function ListarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      setCarregando(true);
      const resposta = await alunoService.listarTodos();
      setAlunos(resposta.data);
      setErro("");
    } catch (erro) {
      setErro("Erro ao carregar alunos");
    } finally {
      setCarregando(false);
    }
  };

  const formatarData = (dataString) => {
    if (!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarGenero = (genero) => {
    return genero === 'MASCULINO' ? 'Masculino' : 'Feminino';
  };

  if (carregando) {
    return (
      <div className="p-4 bg-white min-h-screen text-blue-900">
        <h2 className="text-lg font-bold mb-4">Lista de Alunos</h2>
        <div className="text-center py-8">Carregando...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-4 bg-white min-h-screen text-blue-900">
        <h2 className="text-lg font-bold mb-4">Lista de Alunos</h2>
        <div className="bg-red-100 text-red-800 p-3 rounded">{erro}</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white min-h-screen text-blue-900">
      <h2 className="text-lg font-bold mb-4">Lista de Alunos</h2>
      
      {alunos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum aluno cadastrado
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-left">Gênero</th>
                <th className="px-4 py-2 text-left">Data Nascimento</th>
                <th className="px-4 py-2 text-left">Escola</th>
                <th className="px-4 py-2 text-left">Série</th>
                <th className="px-4 py-2 text-left">Responsável</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="px-4 py-2">{aluno.nome}</td>
                  <td className="px-4 py-2">{formatarGenero(aluno.genero)}</td>
                  <td className="px-4 py-2">{formatarData(aluno.nascimento)}</td>
                  <td className="px-4 py-2">{aluno.escola}</td>
                  <td className="px-4 py-2">{aluno.serie}</td>
                  <td className="px-4 py-2">{aluno.paiNome || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
