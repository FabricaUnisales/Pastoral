import React, { useState, useEffect } from "react";
import { alunoService } from "../services/api";

export default function Chamada() {
  const [alunos, setAlunos] = useState([]);
  const [chamada, setChamada] = useState({});
  const [dataChamada, setDataChamada] = useState(new Date().toISOString().split('T')[0]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      setCarregando(true);
      const resposta = await alunoService.listarTodos();
      setAlunos(resposta.data);
      
      const chamadaInicial = {};
      resposta.data.forEach(aluno => {
        chamadaInicial[aluno.id] = false;
      });
      setChamada(chamadaInicial);
      
      setErro("");
    } catch (erro) {
      setErro("Erro ao carregar alunos");
    } finally {
      setCarregando(false);
    }
  };

  const lidarComPresenca = (alunoId, presente) => {
    setChamada(prev => ({
      ...prev,
      [alunoId]: presente
    }));
  };

  const marcarTodosPresentes = () => {
    const novaChamada = {};
    alunos.forEach(aluno => {
      novaChamada[aluno.id] = true;
    });
    setChamada(novaChamada);
  };

  const marcarTodosAusentes = () => {
    const novaChamada = {};
    alunos.forEach(aluno => {
      novaChamada[aluno.id] = false;
    });
    setChamada(novaChamada);
  };

  const salvarChamada = async () => {
    try {
      const dadosChamada = {
        data: dataChamada,
        presencas: Object.entries(chamada).map(([alunoId, presente]) => ({
          alunoId: parseInt(alunoId),
          presente
        }))
      };
      
      setMensagem("Chamada salva com sucesso!");
      setTimeout(() => setMensagem(""), 3000);
    } catch (erro) {
      setMensagem("Erro ao salvar chamada");
    }
  };

  const calcularEstatisticas = () => {
    const total = alunos.length;
    const presentes = Object.values(chamada).filter(presente => presente).length;
    const ausentes = total - presentes;
    const percentual = total > 0 ? ((presentes / total) * 100).toFixed(1) : 0;
    
    return { total, presentes, ausentes, percentual };
  };

  if (carregando) {
    return (
      <div className="p-4 bg-white min-h-screen text-blue-900">
        <h2 className="text-lg font-bold mb-4">Chamada</h2>
        <div className="text-center py-8">Carregando...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-4 bg-white min-h-screen text-blue-900">
        <h2 className="text-lg font-bold mb-4">Chamada</h2>
        <div className="bg-red-100 text-red-800 p-3 rounded">{erro}</div>
      </div>
    );
  }

  const estatisticas = calcularEstatisticas();

  return (
    <div className="p-4 bg-white min-h-screen text-blue-900">
      <h2 className="text-lg font-bold mb-4">Chamada</h2>
      
      {mensagem && (
        <div className={`p-3 mb-4 rounded ${mensagem.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {mensagem}
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Data da Chamada</label>
            <input
              type="date"
              value={dataChamada}
              onChange={(e) => setDataChamada(e.target.value)}
              className="border p-2 rounded"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={marcarTodosPresentes}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Marcar Todos Presentes
            </button>
            <button
              onClick={marcarTodosAusentes}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Marcar Todos Ausentes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-blue-100 p-3 rounded">
            <div className="text-lg font-bold">{estatisticas.total}</div>
            <div className="text-sm">Total</div>
          </div>
          <div className="bg-green-100 p-3 rounded">
            <div className="text-lg font-bold">{estatisticas.presentes}</div>
            <div className="text-sm">Presentes</div>
          </div>
          <div className="bg-red-100 p-3 rounded">
            <div className="text-lg font-bold">{estatisticas.ausentes}</div>
            <div className="text-sm">Ausentes</div>
          </div>
          <div className="bg-yellow-100 p-3 rounded">
            <div className="text-lg font-bold">{estatisticas.percentual}%</div>
            <div className="text-sm">Presença</div>
          </div>
        </div>
      </div>

      {alunos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Nenhum aluno cadastrado
        </div>
      ) : (
        <div className="space-y-2">
          {alunos.map((aluno) => (
            <div
              key={aluno.id}
              className={`flex items-center justify-between p-3 border rounded ${
                chamada[aluno.id] ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'
              }`}
            >
              <div>
                <div className="font-medium">{aluno.nome}</div>
                <div className="text-sm text-gray-600">
                  {aluno.escola} - {aluno.serie}
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => lidarComPresenca(aluno.id, true)}
                  className={`px-3 py-1 rounded text-sm ${
                    chamada[aluno.id]
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-green-100'
                  }`}
                >
                  Presente
                </button>
                <button
                  onClick={() => lidarComPresenca(aluno.id, false)}
                  className={`px-3 py-1 rounded text-sm ${
                    !chamada[aluno.id]
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-red-100'
                  }`}
                >
                  Ausente
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {alunos.length > 0 && (
        <div className="mt-6">
          <button
            onClick={salvarChamada}
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Salvar Chamada
          </button>
        </div>
      )}
    </div>
  );
}
