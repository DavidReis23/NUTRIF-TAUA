// src/router.tsx
import { createBrowserRouter, Navigate} from "react-router-dom";
// páginas nutricionista
// Vamos refatorar essas rotas colocando as subrotas dentro das funcões das rotas principais

import App from "../App"; // layout do sistema interno
import PublicLayout from "../layouts/PublicLayout"; // layout simples sem sidebar
import HomeAluno from "../pages/pageAlunos/Home";

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


// Criar um contexto authProvider para o UsuarioLogado (Critico)

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },

  {
    path: "/dashboard",
    Component: App,
    children: [
      { index: true, Component: Dashboard },

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