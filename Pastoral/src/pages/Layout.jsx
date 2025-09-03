import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const links = [
  { to: "/home", label: "Início" },
  { to: "/cadastro-voluntario", label: "Cadastro Voluntário" },
  { to: "/cadastro-doacao", label: "Cadastro Doação" },
  { to: "/cadastro-aluno", label: "Cadastro Aluno" },

  { to: "/listar-alunos", label: "Listar Alunos" },
  { to: "/carteirinhas", label: "Carteirinhas" },
  { to: "/chamada", label: "Chamada" },
  { to: "/relatorio-doacoes", label: "Relatório Doações" },
  { to: "/relatorio-alunos", label: "Relatório Alunos" },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen bg-white shadow-xl flex flex-col items-center py-8 px-4 fixed left-0 top-0 z-20">
        <img src={logo} alt="Logo UniSales" className="w-32 mb-8" />
        <nav className="flex-1 w-full">
          <ul className="space-y-2">
            {links.map(link => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`block px-4 py-2 rounded-lg font-medium transition-all duration-150
                    ${location.pathname === link.to
                      ? "bg-blue-900 text-white shadow"
                      : "text-blue-900 hover:bg-blue-100 hover:text-blue-900"}
                  `}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="mt-8 w-full bg-red-600 text-white py-2 rounded-lg font-bold shadow hover:bg-red-700 transition-all"
          onClick={handleLogout}
        >
          Sair
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-8 min-h-screen bg-transparent">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

