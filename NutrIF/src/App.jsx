// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Importando as nossas telas:
import Login from "./pages/pageLogin/Login";
import Dashboard from "./pages/pageNutri/Dashboard";
import Cardapio from "./pages/pageNutri/Cardapio";
import AddCardapio from "./pages/pageNutri/AddCardapio";
import Cursos from "./pages/pageNutri/Cursos";
import AddCurso from "./pages/pageNutri/AddCurso";
import Alunos from "./pages/pageNutri/Alunos";
import AddAluno from "./pages/pageNutri/AddAluno";
import QrCode from "./pages/pageNutri/QrCode";
import QrCodeLista from "./pages/pageNutri/QrCodeLista";
import Bolsista from "./pages/pageNutri/Bolsista";
import Relatorios from "./pages/pageNutri/Relatorios";
import RelatorioAuditoria from "./pages/pageNutri/RelatorioAuditoria";
import RelatorioPresenca from "./pages/pageNutri/RelatorioPresenca";
import Notificacoes from "./pages/pageNutri/Notificacoes";

const RotaProtegida = ({ children }) => {
  const estaLogado = localStorage.getItem("usuario_logado") === "true";
  return estaLogado ? children : <Navigate to="/login" replace />;
};

const LayoutSistema = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <RotaProtegida>
              <LayoutSistema />
            </RotaProtegida>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/cardapio/adicionar" element={<AddCardapio />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/adicionar" element={<AddCurso />} />
          <Route path="/alunos" element={<Alunos />} />
          <Route path="/alunos/adicionar" element={<AddAluno />} />
          <Route path="/qrcode" element={<QrCode />} />
          <Route path="/qrcode/lista" element={<QrCodeLista />} />
          <Route path="/bolsista" element={<Bolsista />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route
            path="/relatorios/auditoria"
            element={<RelatorioAuditoria />}
          />
          <Route path="/relatorios/presenca" element={<RelatorioPresenca />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
