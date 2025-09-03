import React, { useState, useEffect } from "react";
import { doacaoService } from "../services/api";

export default function RelatorioDoacoes() {
  const [doacoes, setDoacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    carregarDoacoes();
  }, []);

  const carregarDoacoes = async () => {
    try {
      setCarregando(true);
      const resposta = await doacaoService.listarTodos();
      setDoacoes(resposta.data);
      setErro("");
    } catch (erro) {
      setErro("Erro ao carregar dados das doações");
    } finally {
      setCarregando(false);
    }
  };

  const calcularEstatisticas = () => {
    const total = doacoes.length;
    const totalValor = doacoes.reduce((soma, doacao) => {
      const valor = parseFloat(doacao.valor) || 0;
      return soma + valor;
    }, 0);
    
    const tipos = {};
    doacoes.forEach(doacao => {
      if (doacao.tipo) {
        tipos[doacao.tipo] = (tipos[doacao.tipo] || 0) + 1;
      }
    });

    const doadores = {};
    doacoes.forEach(doacao => {
      if (doacao.doador) {
        doadores[doacao.doador] = (doadores[doacao.doador] || 0) + 1;
      }
    });

    const doacoesPorMes = {};
    doacoes.forEach(doacao => {
      if (doacao.dataDoacao) {
        const data = new Date(doacao.dataDoacao);
        const mesAno = `${data.getMonth() + 1}/${data.getFullYear()}`;
        doacoesPorMes[mesAno] = (doacoesPorMes[mesAno] || 0) + 1;
      }
    });

    return {
      total,
      totalValor,
      tipos,
      doadores,
      doacoesPorMes
    };
  };

  const formatarTipo = (tipo) => {
    const tipos = {
      'DINHEIRO': 'Dinheiro',
      'ALIMENTOS': 'Alimentos',
      'ROUPAS': 'Roupas',
      'BRINQUEDOS': 'Brinquedos',
      'LIVROS': 'Livros',
      'OUTROS': 'Outros'
    };
    return tipos[tipo] || tipo;
  };

  const formatarValor = (valor) => {
    if (!valor || valor === 0) return 'R$ 0,00';
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  if (carregando) {
    return (
      <div className="p-4 bg-white text-blue-900">
        <h2 className="text-lg font-bold mb-4">Relatório de Doações</h2>
        <div className="text-center py-4">Carregando...</div>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="p-4 bg-white text-blue-900">
        <h2 className="text-lg font-bold mb-4">Relatório de Doações</h2>
        <div className="bg-red-100 text-red-800 p-3 rounded">{erro}</div>
      </div>
    );
  }

  const estatisticas = calcularEstatisticas();

  return (
    <div className="p-4 bg-white text-blue-900">
      <h2 className="text-lg font-bold mb-4">Relatório de Doações</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">{estatisticas.total}</h3>
          <p className="text-sm">Total de Doações</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">{formatarValor(estatisticas.totalValor)}</h3>
          <p className="text-sm">Valor Total</p>
        </div>
        
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="font-bold text-lg">{Object.keys(estatisticas.doadores).length}</h3>
          <p className="text-sm">Doadores Únicos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-bold mb-3">Doações por Tipo</h3>
          <div className="bg-gray-50 p-4 rounded">
            {Object.keys(estatisticas.tipos).length > 0 ? (
              Object.entries(estatisticas.tipos).map(([tipo, quantidade]) => (
                <div key={tipo} className="flex justify-between py-1">
                  <span>{formatarTipo(tipo)}</span>
                  <span className="font-bold">{quantidade}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Nenhuma doação cadastrada</p>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-bold mb-3">Top Doadores</h3>
          <div className="bg-gray-50 p-4 rounded">
            {Object.keys(estatisticas.doadores).length > 0 ? (
              Object.entries(estatisticas.doadores)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([doador, quantidade]) => (
                  <div key={doador} className="flex justify-between py-1">
                    <span>{doador}</span>
                    <span className="font-bold">{quantidade}</span>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">Nenhum doador cadastrado</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-bold mb-3">Doações por Mês</h3>
        <div className="bg-gray-50 p-4 rounded">
          {Object.keys(estatisticas.doacoesPorMes).length > 0 ? (
            Object.entries(estatisticas.doacoesPorMes)
              .sort(([a], [b]) => {
                const [mesA, anoA] = a.split('/');
                const [mesB, anoB] = b.split('/');
                return new Date(anoA, mesA - 1) - new Date(anoB, mesB - 1);
              })
              .map(([mesAno, quantidade]) => (
                <div key={mesAno} className="flex justify-between py-1">
                  <span>{mesAno}</span>
                  <span className="font-bold">{quantidade}</span>
                </div>
              ))
          ) : (
            <p className="text-gray-500">Nenhuma doação com data cadastrada</p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-bold mb-3">Lista Detalhada de Doações</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Doador</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Tipo</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Descrição</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Valor</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Data</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Arquivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {doacoes.map((doacao) => (
                <tr key={doacao.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-900">{doacao.doador}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{formatarTipo(doacao.tipo)}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{doacao.descricao}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">{formatarValor(doacao.valor)}</td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {new Date(doacao.dataDoacao).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-900">
                    {doacao.nomeArquivo ? (
                      <button
                        onClick={() => window.open(`http://localhost:8080/api/arquivos/doacao/${doacao.id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-800 underline text-xs"
                      >
                        📎 {doacao.nomeArquivo}
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">Sem arquivo</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
