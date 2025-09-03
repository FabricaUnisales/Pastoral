import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const alunoService = {
  listarTodos: () => api.get('/alunos'),
  buscarPorId: (id) => api.get(`/alunos/${id}`),

  criar: (dados) => api.post('/alunos', dados),
  atualizar: (id, dados) => api.put(`/alunos/${id}`, dados),
  excluir: (id) => api.delete(`/alunos/${id}`),
};



export const voluntarioService = {
  listarTodos: () => api.get('/voluntarios'),
  buscarPorId: (id) => api.get(`/voluntarios/${id}`),
  criar: (dados) => api.post('/voluntarios', dados),
  atualizar: (id, dados) => api.put(`/voluntarios/${id}`, dados),
  excluir: (id) => api.delete(`/voluntarios/${id}`),
};

export const doacaoService = {
  listarTodos: () => api.get('/doacoes'),
  buscarPorId: (id) => api.get(`/doacoes/${id}`),
  criar: (dados) => api.post('/doacoes', dados),
  criarComArquivo: (formData) => api.post('/doacoes/com-arquivo', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  atualizar: (id, dados) => api.put(`/doacoes/${id}`, dados),
  excluir: (id) => api.delete(`/doacoes/${id}`),
};

export const chamadaService = {
  listarTodas: () => api.get('/chamadas'),
  buscarPorId: (id) => api.get(`/chamadas/${id}`),
  buscarPorData: (data) => api.get(`/chamadas/data/${data}`),
  listarPorPeriodo: (dataInicio, dataFim) => api.get(`/chamadas/periodo?dataInicio=${dataInicio}&dataFim=${dataFim}`),
  criar: (dados) => api.post('/chamadas', dados),
  atualizar: (id, dados) => api.put(`/chamadas/${id}`, dados),
  excluir: (id) => api.delete(`/chamadas/${id}`),
};

export default api; 