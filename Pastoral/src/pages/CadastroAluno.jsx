import React, { useState, useEffect } from "react";
import { alunoService, paiService } from "../services/api";

export default function CadastroAluno() {
  const [formulario, setFormulario] = useState({
    nome: "",
    genero: "",
    nascimento: "",
    escola: "",
    serie: "",
    paiId: ""
  });
  const [pais, setPais] = useState([]);
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarPais();
  }, []);

  const carregarPais = async () => {
    try {
      const resposta = await paiService.listarTodos();
      setPais(resposta.data);
    } catch (erro) {
      setMensagem("Erro ao carregar responsáveis");
    }
  };

  const lidarComMudanca = (campo, valor) => {
    setFormulario(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  const lidarComEnvio = async (evento) => {
    evento.preventDefault();
    setCarregando(true);
    setMensagem("");

    try {
      await alunoService.criar(formulario);
      setMensagem("Aluno cadastrado com sucesso!");
      setFormulario({
        nome: "",
        genero: "",
        nascimento: "",
        escola: "",
        serie: "",
        paiId: ""
      });
    } catch (erro) {
      setMensagem("Erro ao cadastrar aluno");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Cadastro de Aluno</h2>
        {mensagem && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-center font-medium animate-fade-in ${mensagem.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {mensagem}
          </div>
        )}
        <form onSubmit={lidarComEnvio} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={formulario.nome}
              onChange={(e) => lidarComMudanca("nome", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <select
              value={formulario.genero}
              onChange={(e) => lidarComMudanca("genero", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            >
              <option value="">Selecione o gênero</option>
              <option value="MASCULINO">Masculino</option>
              <option value="FEMININO">Feminino</option>
            </select>
          </div>
          <div>
            <input
              type="date"
              value={formulario.nascimento}
              onChange={(e) => lidarComMudanca("nascimento", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Escola"
              value={formulario.escola}
              onChange={(e) => lidarComMudanca("escola", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Série"
              value={formulario.serie}
              onChange={(e) => lidarComMudanca("serie", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <select
              value={formulario.paiId}
              onChange={(e) => lidarComMudanca("paiId", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            >
              <option value="">Selecione o responsável</option>
              {pais.map(pai => (
                <option key={pai.id} value={pai.id}>
                  {pai.nome} - {pai.telefone}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-blue-900 text-white font-bold py-3 rounded-lg shadow hover:bg-blue-800 transition-all disabled:opacity-50"
          >
            {carregando ? "Salvando..." : "Salvar"}
          </button>
        </form>
      </div>
    </div>
  );
}
