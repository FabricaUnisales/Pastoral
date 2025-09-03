import React, { useState, useEffect } from "react";
import { alunoService } from "../services/api";

export default function RelatorioAlunos() {
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
      setErro("Erro ao carregar dados dos alunos");
    } finally {
      setCarregando(false);
    }
  };

  const calcularEstatisticas = () => {
    const total = alunos.length;
    const masculino = alunos.filter(aluno => aluno.genero === 'MASCULINO').length;
    const feminino = alunos.filter(aluno => aluno.genero === 'FEMININO').length;
    
    const escolas = {};
    alunos.forEach(aluno => {
      if (aluno.escola) {
        escolas[aluno.escola] = (escolas[aluno.escola] || 0) + 1;
      }
    });

    const series = {};
    alunos.forEach(aluno => {
      if (aluno.serie) {
        series[aluno.serie] = (series[aluno.serie] || 0) + 1;
      }
    });

    return {
      total,
      masculino,
      feminino,
      escolas,
      series
    };
  };

  if (carregando) {
    return (
      <div className="p-4 bg-white text-blue-900">
        <h2 className="text-lg font-bold mb-4">Relatório de Alunos</h2>
        <div className="text-center py-4">Carregando...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-4 bg-white text-blue-900">
        <h2 className="text-lg font-bold mb-4">Relatório de Alunos</h2>
        <div className="bg-red-100 text-red-800 p-3 rounded">{erro}</div>
      </div>
    );
  }

  const estatisticas = calcularEstatisticas();

  return (
    <div className="p-4 bg-white text-blue-900">
      <h2 className="text-lg font-bold mb-4">Relatório de Alunos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">{estatisticas.total}</h3>
          <p className="text-sm">Total de Alunos</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">{estatisticas.masculino}</h3>
          <p className="text-sm">Masculino</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">{estatisticas.feminino}</h3>
          <p className="text-sm">Feminino</p>
        </div>
        
        <div className="bg-blue-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">{Object.keys(estatisticas.escolas).length}</h3>
          <p className="text-sm">Escolas Diferentes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-3">Alunos por Escola</h3>
          <div className="bg-gray-50 p-4 rounded">
            {Object.keys(estatisticas.escolas).length > 0 ? (
              Object.entries(estatisticas.escolas).map(([escola, quantidade]) => (
                <div key={escola} className="flex justify-between py-1">
                  <span>{escola}</span>
                  <span className="font-bold">{quantidade}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma escola cadastrada</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Alunos por Série</h3>
          <div className="bg-gray-50 p-4 rounded">
            {Object.keys(estatisticas.series).length > 0 ? (
              Object.entries(estatisticas.series).map(([serie, quantidade]) => (
                <div key={serie} className="flex justify-between py-1">
                  <span>{serie}</span>
                  <span className="font-bold">{quantidade}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma série cadastrada</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
