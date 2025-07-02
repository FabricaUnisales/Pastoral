import React, { useState } from "react";
import { voluntarioService } from "../services/api";

export default function CadastroVoluntario() {
  const [formulario, setFormulario] = useState({
    nome: "",
    telefone: "",
    email: "",
    areaAtuacao: ""
  });
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

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
      await voluntarioService.criar(formulario);
      setMensagem("Voluntário cadastrado com sucesso!");
      setFormulario({
        nome: "",
        telefone: "",
        email: "",
        areaAtuacao: ""
      });
    } catch (erro) {
      setMensagem("Erro ao cadastrar voluntário");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Cadastro de Voluntário</h2>
        {mensagem && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-center font-medium animate-fade-in ${mensagem.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {mensagem}
          </div>
        )}
        <form onSubmit={lidarComEnvio} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Nome completo"
              value={formulario.nome}
              onChange={(e) => lidarComMudanca("nome", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Telefone"
              value={formulario.telefone}
              onChange={(e) => lidarComMudanca("telefone", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formulario.email}
              onChange={(e) => lidarComMudanca("email", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <select
              value={formulario.areaAtuacao}
              onChange={(e) => lidarComMudanca("areaAtuacao", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            >
              <option value="">Selecione a área de atuação</option>
              <option value="EDUCACAO">Educação</option>
              <option value="SAUDE">Saúde</option>
              <option value="ADMINISTRATIVO">Administrativo</option>
              <option value="EVENTOS">Eventos</option>
              <option value="OUTROS">Outros</option>
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
