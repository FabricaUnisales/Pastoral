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
  listarPorPai: (paiId) => api.get(`/alunos/pai/${paiId}`),
  criar: (dados) => api.post('/alunos', dados),
  atualizar: (id, dados) => api.put(`/alunos/${id}`, dados),
  excluir: (id) => api.delete(`/alunos/${id}`),
};

export const paiService = {
  listarTodos: () => api.get('/pais'),
  buscarPorId: (id) => api.get(`/pais/${id}`),
  criar: (dados) => api.post('/pais', dados),
  atualizar: (id, dados) => api.put(`/pais/${id}`, dados),
  excluir: (id) => api.delete(`/pais/${id}`),
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
  atualizar: (id, dados) => api.put(`/doacoes/${id}`, dados),
  excluir: (id) => api.delete(`/doacoes/${id}`),
};

export default api; 