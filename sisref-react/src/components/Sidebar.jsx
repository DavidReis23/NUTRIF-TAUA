import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          <li className={location.pathname === "/" ? "active" : ""}>
            <Link to="/">
              <i className="ph ph-house"></i> Início
            </Link>
          </li>
          <li className={location.pathname === "/cardapio" ? "active" : ""}>
            <Link to="/cardapio">
              <i className="ph ph-fork-knife"></i> Cardápio
            </Link>
          </li>
          <li className={location.pathname === "/cursos" ? "active" : ""}>
            <Link to="/cursos">
              <i className="ph ph-users-three"></i> Cursos
            </Link>
          </li>
          <li className={location.pathname === "/alunos" ? "active" : ""}>
            <Link to="/alunos">
              <i className="ph ph-student"></i> Alunos
            </Link>
          </li>
          <li className={location.pathname === "/relatorios" ? "active" : ""}>
            <Link to="/relatorios">
              <i className="ph ph-clipboard-text"></i> Relatórios
            </Link>
          </li>
          <li className={location.pathname === "/notificacoes" ? "active" : ""}>
            <Link to="/notificacoes">
              <i className="ph ph-files"></i> Notificações
            </Link>
          </li>
          <li className={location.pathname === "/qrcode" ? "active" : ""}>
            <Link to="/qrcode">
              <i className="ph ph-qr-code"></i> QR-Code
            </Link>
          </li>
          <li className={location.pathname === "/bolsista" ? "active" : ""}>
            <Link to="/bolsista">
              <i className="ph ph-user"></i> Área Bolsista
            </Link>
          </li>
        </ul>
      </nav>
      <div className="logout">
        <Link to="/login">
          <button>
            <i className="ph ph-sign-out"></i> Sair
          </button>
        </Link>
      </div>
    </aside>
  );
}
