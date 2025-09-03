import React, { useState } from "react";
import { doacaoService } from "../services/api";

export default function CadastroDoacao() {
  const [formulario, setFormulario] = useState({
    doador: "",
    tipo: "",
    descricao: "",
    valor: "",
    dataDoacao: ""
  });
  const [arquivo, setArquivo] = useState(null);
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
      if (arquivo) {
        // Se tem arquivo, usar o endpoint com arquivo
        const formData = new FormData();
        formData.append('doador', formulario.doador);
        formData.append('tipo', formulario.tipo);
        formData.append('descricao', formulario.descricao);
        formData.append('valor', formulario.valor || '');
        formData.append('dataDoacao', formulario.dataDoacao);
        formData.append('arquivo', arquivo);
        
        await doacaoService.criarComArquivo(formData);
      } else {
        // Se não tem arquivo, usar o endpoint normal
        const dadosParaEnviar = {
          ...formulario,
          valor: formulario.valor ? parseFloat(formulario.valor) : null
        };
        
        await doacaoService.criar(dadosParaEnviar);
      }
      
      setMensagem("Doação cadastrada com sucesso!");
      setFormulario({
        doador: "",
        tipo: "",
        descricao: "",
        valor: "",
        dataDoacao: ""
      });
      setArquivo(null);
    } catch (erro) {
      setMensagem("Erro ao cadastrar doação");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Cadastro de Doação</h2>
        {mensagem && (
          <div className={`mb-6 px-4 py-3 rounded-lg text-center font-medium animate-fade-in ${mensagem.includes('sucesso') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {mensagem}
          </div>
        )}
        <form onSubmit={lidarComEnvio} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Nome do doador"
              value={formulario.doador}
              onChange={(e) => lidarComMudanca("doador", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <select
              value={formulario.tipo}
              onChange={(e) => lidarComMudanca("tipo", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            >
              <option value="">Selecione o tipo de doação</option>
              <option value="DINHEIRO">Dinheiro</option>
              <option value="ALIMENTOS">Alimentos</option>
              <option value="ROUPAS">Roupas</option>
              <option value="BRINQUEDOS">Brinquedos</option>
              <option value="LIVROS">Livros</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>
          <div>
            <textarea
              placeholder="Descrição da doação"
              value={formulario.descricao}
              onChange={(e) => lidarComMudanca("descricao", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              rows="3"
              required
            />
          </div>
          <div>
            <input
              type="number"
              step="0.01"
              placeholder="Valor (se aplicável)"
              value={formulario.valor}
              onChange={(e) => lidarComMudanca("valor", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
            />
          </div>
          <div>
            <input
              type="date"
              value={formulario.dataDoacao}
              onChange={(e) => lidarComMudanca("dataDoacao", e.target.value)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Arquivo de Comprovação (opcional)
            </label>
            <input
              type="file"
              onChange={(e) => setArquivo(e.target.files[0] || null)}
              className="w-full border border-blue-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-900 bg-blue-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            />
            {arquivo && (
              <p className="text-sm text-blue-600 mt-1">
                Arquivo selecionado: {arquivo.name}
              </p>
            )}
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
