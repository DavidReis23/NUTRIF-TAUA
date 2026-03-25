import AppLayout from "../layouts/AppLayout"; // layout do sistema interno
import PublicLayout from "../layouts/PublicLayout"; // layout simples sem sidebar

import Login from "../pages/pageLogin/Login";
import Dashboard from "../pages/pageNutri/Dashboard";
import Cardapio from "../pages/pageNutri/Cardapio";
import AddCardapio from "../pages/pageNutri/AddCardapio";
import Cursos from "../pages/pageNutri/Cursos";
import AddCurso from "../pages/pageNutri/AddCurso";
import Alunos from "../pages/pageNutri/Alunos";
import AddAluno from "../pages/pageNutri/AddAluno";
import QrCode from "../pages/pageNutri/QrCode";
import QrCodeLista from "../pages/pageNutri/QrCodeLista";
import Bolsista from "../pages/pageNutri/Bolsista";
import Relatorios from "../pages/pageNutri/Relatorios";
import RelatorioAuditoria from "../pages/pageNutri/RelatorioAuditoria";
import RelatorioPresenca from "../pages/pageNutri/RelatorioPresenca";
import Notificacoes from "../pages/pageNutri/Notificacoes";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  // rotas públicas
  {
    Component: PublicLayout,
    children: [
      {
        path: "/",
        Component: Login,
      },
    ],
  },

  // rotas protegidas (sistema)
  {
    Component: AppLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },

      { path: "cardapio", Component: Cardapio },
      { path: "cardapio/adicionar", Component: AddCardapio },

      { path: "cursos", Component: Cursos },
      { path: "cursos/adicionar", Component: AddCurso },

      { path: "alunos", Component: Alunos },
      { path: "alunos/adicionar", Component: AddAluno },

      { path: "qrcode", Component: QrCode },
      { path: "qrcode/lista", Component: QrCodeLista },

      { path: "bolsista", Component: Bolsista },

      { path: "relatorios", Component: Relatorios },
      { path: "relatorios/auditoria", Component: RelatorioAuditoria },
      { path: "relatorios/presenca", Component: RelatorioPresenca },

      { path: "notificacoes", Component: Notificacoes },
    ],
  },
]);