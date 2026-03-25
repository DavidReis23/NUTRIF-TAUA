
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario_logado");
    navigate("/login");
  };

  return (
    <aside className="sidebar-container">
      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <i className="ph ph-house"></i> Início
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cardapio"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <i className="ph ph-fork-knife"></i> Cardápio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cursos"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <i className="ph ph-graduation-cap"></i> Cursos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/alunos"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <i className="ph ph-users"></i> Alunos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/relatorios"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <i className="ph ph-chart-bar"></i> Relatórios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notificacoes"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <i className="ph ph-bell"></i> Notificações
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/qrcode"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <i className="ph ph-qr-code"></i> QR-Code
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/bolsista"
            className={({ isActive }) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            <i className="ph ph-user-list"></i> Área Bolsista
          </NavLink>
        </li>
      </ul>

      <button className="btn-sidebar-sair" onClick={handleLogout}>
        <i className="ph ph-sign-out"></i> Sair
      </button>
    </aside>
  );
}
