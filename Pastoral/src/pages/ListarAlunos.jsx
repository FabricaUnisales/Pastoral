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

  const calcularIdade = (dataNascimento) => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade;
  };

  if (carregando) {
    return (
      <div className="p-4 bg-white text-blue-900">
        <h2 className="text-lg font-bold mb-4">Lista de Alunos</h2>
        <div className="text-center py-4">Carregando...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-4 bg-white text-blue-900">
        <h2 className="text-lg font-bold mb-4">Lista de Alunos</h2>
        <div className="bg-red-100 text-red-800 p-3 rounded">{erro}</div>
        <button 
          onClick={carregarAlunos}
          className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white text-blue-900">
      <h2 className="text-lg font-bold mb-4">Lista de Alunos</h2>
      
      {alunos.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          Nenhum aluno cadastrado
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="px-4 py-2 text-left">Nome</th>
                <th className="px-4 py-2 text-left">Idade</th>
                <th className="px-4 py-2 text-left">Gênero</th>
                <th className="px-4 py-2 text-left">Escola</th>
                <th className="px-4 py-2 text-left">Série</th>
                <th className="px-4 py-2 text-left">Mãe</th>
                <th className="px-4 py-2 text-left">Pai</th>
                <th className="px-4 py-2 text-left">Código</th>
              </tr>
            </thead>
            <tbody>
              {alunos.map((aluno) => (
                <tr key={aluno.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium">{aluno.nome}</td>
                  <td className="px-4 py-2">{calcularIdade(aluno.nascimento)} anos</td>
                  <td className="px-4 py-2">{formatarGenero(aluno.genero)}</td>
                  <td className="px-4 py-2">{aluno.escola}</td>
                  <td className="px-4 py-2">{aluno.serie}</td>
                  <td className="px-4 py-2">{aluno.nomeMae || "-"}</td>
                  <td className="px-4 py-2">{aluno.nomePai || "-"}</td>
                  <td className="px-4 py-2">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono">
                      {aluno.codigoCarteirinha}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div className="mt-4 text-sm text-gray-600">
            Total de alunos: {alunos.length}
          </div>
        </div>
      )}
    </div>
  );
}