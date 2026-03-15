// src/components/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("usuario_logado");
    navigate("/login");
  };

  return (
    <header className="header-container">
      <h1 className="header-logo">NUTRIF-TAUÁ</h1>

      <div className="header-right-actions">
        {/* Ícone de Sair */}
        <button
          className="icon-btn-header"
          title="Sair do sistema"
          onClick={handleLogout}
        >
          <i className="ph ph-sign-out"></i>
        </button>

        {/* Ícone de Notificações */}
        <button className="icon-btn-header">
          <i className="ph ph-bell"></i>
          <span className="badge-notification">2</span>
        </button>

        {/* Perfil Nutricionista */}
        <div className="profile-badge">
          <div className="profile-avatar">NU</div>
          <span className="profile-name">Nutricionista</span>
        </div>
      </div>
    </header>
  );
}
