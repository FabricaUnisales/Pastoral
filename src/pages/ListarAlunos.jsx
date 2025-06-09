import React, { useState } from "react";
import "../styles/Table.css";

export default function ListarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [exibir, setExibir] = useState(false);

  const dadosSimulados = [
    { nome: "João Silva", responsavel: "Carlos Silva", turma: "Turma A" },
    { nome: "Maria Souza", responsavel: "Ana Souza", turma: "Turma B" },
    { nome: "Pedro Costa", responsavel: "Luciana Costa", turma: "Turma C" },
  ];

  const toggleLista = () => {
    if (!exibir) {
      setAlunos(dadosSimulados); // Preenche com dados simulados
    } else {
      setAlunos([]); // Esvazia a lista
    }
    setExibir(!exibir); // Alterna o estado
  };

  return (
    <div className="table-container">
      <h2>Listagem de Alunos</h2>
      <br/>
      <button className="toggle-button" onClick={toggleLista}>
        {exibir ? "Ocultar Lista" : "Ver Lista de Alunos"}
      </button>

      {exibir && alunos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Responsável</th>
              <th>Turma</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno, index) => (
              <tr key={index}>
                <td>{aluno.nome}</td>
                <td>{aluno.responsavel}</td>
                <td>{aluno.turma}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
