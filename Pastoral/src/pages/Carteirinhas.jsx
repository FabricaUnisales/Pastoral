import React, { useState, useEffect } from 'react';
import { alunoService } from '../services/api';
import CarteirinhaMinima from '../components/CarteirinhaMinima';
import Carteirinha from '../components/Carteirinha';

export default function Carteirinhas() {
  const [alunos, setAlunos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [termoBusca, setTermoBusca] = useState('');
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    carregarAlunos();
  }, []);

  const carregarAlunos = async () => {
    try {
      setCarregando(true);
      const resposta = await alunoService.listarTodos();
      setAlunos(resposta.data);
    } catch (error) {
      setErro('Erro ao carregar alunos');
    } finally {
      setCarregando(false);
    }
  };

  const alunosFiltrados = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    aluno.codigoCarteirinha.includes(termoBusca) ||
    aluno.escola.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const abrirModal = (aluno) => {
    setAlunoSelecionado(aluno);
    setMostrarModal(true);
  };

  const fecharModal = () => {
    setMostrarModal(false);
    setAlunoSelecionado(null);
  };

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-blue-900 text-lg">Carregando alunos...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Carteirinhas dos Alunos
        </h1>

        {erro && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-100 text-red-800 text-center">
            {erro}
          </div>
        )}

        {/* Barra de busca */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar por nome, código ou escola..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
            className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
          />
        </div>

        {alunosFiltrados.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            {termoBusca ? 'Nenhum aluno encontrado com esse termo de busca.' : 'Nenhum aluno cadastrado.'}
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="text-sm text-gray-600">
                Mostrando {alunosFiltrados.length} de {alunos.length} carteirinhas
              </div>
            </div>

            {/* Grid de carteirinhas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
              {alunosFiltrados.map((aluno) => (
                <div key={aluno.id} className="flex justify-center w-full">
                  <CarteirinhaMinima 
                    aluno={aluno} 
                    onCarteirinhaClick={abrirModal}
                  />
                </div>
              ))}
            </div>


          </>
        )}
      </div>

      {/* Modal da Carteirinha */}
      {mostrarModal && alunoSelecionado && (
        <Carteirinha 
          aluno={alunoSelecionado} 
          onClose={fecharModal} 
        />
      )}
    </div>
  );
}