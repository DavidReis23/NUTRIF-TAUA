import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

// Importando as nossas telas:
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
