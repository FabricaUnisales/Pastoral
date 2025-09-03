import React, { useState, useEffect } from "react";
import { alunoService, chamadaService } from "../services/api";

export default function Chamada() {
  const [alunos, setAlunos] = useState([]);
  const [chamada, setChamada] = useState({});
  const [dataChamada, setDataChamada] = useState(new Date().toISOString().split('T')[0]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [chamadaExistente, setChamadaExistente] = useState(null);
  const [historicoVisible, setHistoricoVisible] = useState(false);
  const [chamadas, setChamadas] = useState([]);

  useEffect(() => {
    carregarAlunos();
  }, []);

  useEffect(() => {
    verificarChamadaExistente();
  }, [dataChamada]);

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

  const verificarChamadaExistente = async () => {
    try {
      const resposta = await chamadaService.buscarPorData(dataChamada);
      if (resposta.data) {
        setChamadaExistente(resposta.data);
        // Preencher chamada com dados existentes
        const chamadaPreenchida = {};
        alunos.forEach(aluno => {
          const presenca = resposta.data.presencas.find(p => p.alunoId === aluno.id);
          chamadaPreenchida[aluno.id] = presenca ? presenca.presente : false;
        });
        setChamada(chamadaPreenchida);
      } else {
        setChamadaExistente(null);
        // Resetar chamada
        const chamadaVazia = {};
        alunos.forEach(aluno => {
          chamadaVazia[aluno.id] = false;
        });
        setChamada(chamadaVazia);
      }
    } catch (erro) {
      setChamadaExistente(null);
    }
  };

  const carregarHistorico = async () => {
    try {
      const resposta = await chamadaService.listarTodas();
      setChamadas(resposta.data);
    } catch (erro) {
      setMensagem("Erro ao carregar histórico de chamadas");
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
      setSalvando(true);
      setMensagem("");

      const dadosChamada = {
        data: dataChamada,
        presencas: Object.entries(chamada).map(([alunoId, presente]) => ({
          alunoId: parseInt(alunoId),
          presente
        }))
      };

      if (chamadaExistente) {
        await chamadaService.atualizar(chamadaExistente.id, dadosChamada);
        setMensagem("Chamada atualizada com sucesso!");
      } else {
        await chamadaService.criar(dadosChamada);
        setMensagem("Chamada salva com sucesso!");
      }
      
      await verificarChamadaExistente();
      setTimeout(() => setMensagem(""), 3000);
    } catch (erro) {
      if (erro.response?.data?.erro) {
        setMensagem(erro.response.data.erro);
      } else {
        setMensagem("Erro ao salvar chamada");
      }
    } finally {
      setSalvando(false);
    }
  };

  const calcularEstatisticas = () => {
    const total = alunos.length;
    const presentes = Object.values(chamada).filter(presente => presente).length;
    const ausentes = total - presentes;
    const percentual = total > 0 ? ((presentes / total) * 100).toFixed(1) : 0;
    
    return { total, presentes, ausentes, percentual };
  };

  const formatarData = (dataString) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  const toggleHistorico = () => {
    setHistoricoVisible(!historicoVisible);
    if (!historicoVisible) {
      carregarHistorico();
    }
  };

  const carregarChamadaHistorica = async (chamadaId) => {
    try {
      const resposta = await chamadaService.buscarPorId(chamadaId);
      if (resposta.data) {
        setDataChamada(resposta.data.data);
        setChamadaExistente(resposta.data);
        
        const chamadaPreenchida = {};
        alunos.forEach(aluno => {
          const presenca = resposta.data.presencas.find(p => p.alunoId === aluno.id);
          chamadaPreenchida[aluno.id] = presenca ? presenca.presente : false;
        });
        setChamada(chamadaPreenchida);
        setHistoricoVisible(false);
      }
    } catch (erro) {
      setMensagem("Erro ao carregar chamada histórica");
    }
  };

  if (carregando) {
    return (
      <div className="p-4 bg-white text-blue-900">
        <h2 className="text-lg font-bold mb-4">Chamada</h2>
        <div className="text-center py-4">Carregando...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-4 bg-white text-blue-900">
        <h2 className="text-lg font-bold mb-4">Chamada</h2>
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

  const estatisticas = calcularEstatisticas();

  return (
    <div className="p-4 bg-white text-blue-900">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Chamada</h2>
        <button
          onClick={toggleHistorico}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          {historicoVisible ? "Ocultar Histórico" : "Ver Histórico"}
        </button>
      </div>
      
      {mensagem && (
        <div className={`p-3 mb-4 rounded ${mensagem.includes('sucesso') || mensagem.includes('atualizada') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {mensagem}
        </div>
      )}

      {historicoVisible && (
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-3">Histórico de Chamadas</h3>
          {chamadas.length === 0 ? (
            <p className="text-gray-500">Nenhuma chamada encontrada</p>
          ) : (
            <div className="max-h-60 overflow-y-auto">
              {chamadas.map((chamadaHist) => (
                <div
                  key={chamadaHist.id}
                  className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => carregarChamadaHistorica(chamadaHist.id)}
                >
                  <div>
                    <div className="font-medium">{formatarData(chamadaHist.data)}</div>
                    <div className="text-sm text-gray-600">
                      {chamadaHist.totalPresentes}/{chamadaHist.totalAlunos} presentes ({chamadaHist.percentualPresenca.toFixed(1)}%)
                    </div>
                  </div>
                  <div className="text-sm text-blue-600">
                    Clique para carregar
                  </div>
                </div>
              ))}
            </div>
          )}
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

        {chamadaExistente && (
          <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded">
            ⚠️ Já existe uma chamada para esta data. As alterações irão atualizar a chamada existente.
          </div>
        )}

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
        <div className="text-center py-4 text-gray-500">
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
            disabled={salvando}
            className="bg-blue-900 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
          >
            {salvando ? "Salvando..." : chamadaExistente ? "Atualizar Chamada" : "Salvar Chamada"}
          </button>
        </div>
      )}
    </div>
  );
}