import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Importando as nossas telas:
import Dashboard from "./pages/Dashboard";
import Cardapio from "./pages/Cardapio";
import AddCardapio from "./pages/AddCardapio";
import Cursos from "./pages/Cursos";
import AddCurso from "./pages/AddCurso";
import Alunos from "./pages/Alunos";
import AddAluno from "./pages/AddAluno";
import QrCode from "./pages/QrCode";
import QrCodeLista from "./pages/QrCodeLista";
import Bolsista from "./pages/Bolsista";
import Relatorios from "./pages/Relatorios";
import RelatorioAuditoria from "./pages/RelatorioAuditoria";
import RelatorioPresenca from "./pages/RelatorioPresenca";
import Notificacoes from "./pages/Notificacoes";

function App() {
  return (
    <Router>
      <Header />
      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <Routes>
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

            <Route
              path="/relatorios/presenca"
              element={<RelatorioPresenca />}
            />

            <Route path="/notificacoes" element={<Notificacoes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
