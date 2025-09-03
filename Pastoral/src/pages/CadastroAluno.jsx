import React, { useState } from "react";
import { alunoService } from "../services/api";
import Carteirinha from "../components/Carteirinha";

export default function CadastroAluno() {
  const [formulario, setFormulario] = useState({
    nome: "",
    genero: "",
    nascimento: "",
    escola: "",
    serie: "",
    nomeMae: "",
    nomePai: ""
  });
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [alunoRecemCadastrado, setAlunoRecemCadastrado] = useState(null);
  const [mostrarCarteirinha, setMostrarCarteirinha] = useState(false);

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
      // Criar objeto com apenas os campos não vazios
      const dadosParaEnvio = {
        nome: formulario.nome,
        genero: formulario.genero,
        nascimento: formulario.nascimento,
        escola: formulario.escola,
        serie: formulario.serie
      };

      // Adicionar campos opcionais apenas se não estiverem vazios
      if (formulario.nomeMae && formulario.nomeMae.trim()) {
        dadosParaEnvio.nomeMae = formulario.nomeMae.trim();
      }
      
      if (formulario.nomePai && formulario.nomePai.trim()) {
        dadosParaEnvio.nomePai = formulario.nomePai.trim();
      }

      const resposta = await alunoService.criar(dadosParaEnvio);
      const alunoSalvo = resposta.data;
      
      setMensagem("Aluno cadastrado com sucesso!");
      setAlunoRecemCadastrado(alunoSalvo);
      setMostrarCarteirinha(true);
      
      setFormulario({
        nome: "",
        genero: "",
        nascimento: "",
        escola: "",
        serie: "",
        nomeMae: "",
        nomePai: ""
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
              placeholder="Nome do aluno"
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
            <input
              type="text"
              placeholder="Nome da mãe (opcional)"
              value={formulario.nomeMae}
              onChange={(e) => lidarComMudanca("nomeMae", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Nome do pai (opcional)"
              value={formulario.nomePai}
              onChange={(e) => lidarComMudanca("nomePai", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
            />
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
      
      {/* Modal da Carteirinha */}
      {mostrarCarteirinha && alunoRecemCadastrado && (
        <Carteirinha 
          aluno={alunoRecemCadastrado} 
          onClose={() => setMostrarCarteirinha(false)} 
        />
      )}
    </div>
  );
}