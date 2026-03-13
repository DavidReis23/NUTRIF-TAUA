import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RelatorioDetalhes.css";

export default function RelatorioAuditoria() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtroAtivo, setFiltroAtivo] = useState("Todos");
  const [logsAudit, setLogsAudit] = useState([]);

  useEffect(() => {
    // 1. PUXA OS ALUNOS REAIS DO SEU BANCO DE DADOS!
    const alunos = JSON.parse(localStorage.getItem("alunos_sisref")) || [];

    // 2. Gera um histórico simulado usando os nomes reais dos alunos
    const gerado = alunos.map((aluno, index) => {
      const statusList = ["Desbloqueado", "Bloqueado", "Retirada de Alerta"];
      const responsaveis = [
        "Nutri. Micaele",
        "Sistema (Faltas)",
        "João Victor",
      ];
      const motivos = [
        "Justificativa Médica",
        "Automático",
        "Correção de Erro",
        "Visita Técnica",
      ];

      return {
        id: index + 1,
        aluno: aluno.nome,
        data: "02/02/2026",
        status: statusList[index % 3], // Intercala para ter exemplos de todos
        responsavel: responsaveis[index % 3],
        motivo: motivos[index % 4],
      };
    });

    setLogsAudit(gerado);
  }, []);

  // Aplica a busca de texto E o filtro das pílulas!
  const logsFiltrados = logsAudit.filter((log) => {
    const textoBate = log.aluno.toLowerCase().includes(busca.toLowerCase());

    if (filtroAtivo === "Desbloqueados")
      return textoBate && log.status === "Desbloqueado";
    if (filtroAtivo === "Bloqueados")
      return textoBate && log.status === "Bloqueado";
    if (filtroAtivo === "Retiradas")
      return textoBate && log.status === "Retirada de Alerta";

    return textoBate; // Se for 'Todos'
  });

  return (
    <div className="relatorio-detalhe-container">
      <div className="header-voltar">
        <div className="title-area-voltar">
          <button
            className="btn-voltar-icon"
            onClick={() => navigate("/relatorios")}
          >
            <i className="ph ph-caret-left"></i>
          </button>
          <div>
            <h2>Histórico Completo de Auditoria</h2>
            <p className="subtitle">
              Rastreabilidade total de bloqueios e ações manuais
            </p>
          </div>
        </div>
        <button className="btn-exportar-topo">
          <i className="ph ph-download-simple"></i> Exportar Tabela
        </button>
      </div>

      <div className="tabela-relatorio-card">
        <div className="toolbar-relatorio">
          <div className="toolbar-left">
            <span
              style={{ fontSize: "0.85rem", fontWeight: "600", color: "#333" }}
            >
              Ordenar:
            </span>
            <button className="btn-sort-rel">
              <i className="ph ph-sort-ascending"></i>
            </button>
            <div className="search-box-rel">
              <i className="ph ph-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Buscar aluno..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
          </div>

          <div className="toolbar-right">
            <div className="pagination-top">
              <button className="page-btn">
                <i className="ph ph-caret-left"></i>
              </button>
              <button
                className="page-btn active"
                style={{ background: "#22c55e", color: "white" }}
              >
                1
              </button>
              <button className="page-btn">
                <i className="ph ph-caret-right"></i>
              </button>
            </div>

            {/* FILTROS IDÊNTICOS AO FIGMA */}
            <div className="status-filters">
              <button
                className={`filter-pill ${filtroAtivo === "Todos" ? "active" : ""}`}
                onClick={() => setFiltroAtivo("Todos")}
              >
                Todos
              </button>
              <button
                className={`filter-pill ${filtroAtivo === "Desbloqueados" ? "active-verde" : ""}`}
                onClick={() => setFiltroAtivo("Desbloqueados")}
              >
                Desbloqueados
              </button>
              <button
                className={`filter-pill ${filtroAtivo === "Bloqueados" ? "active-vermelho" : ""}`}
                onClick={() => setFiltroAtivo("Bloqueados")}
              >
                Bloqueados
              </button>
              <button
                className={`filter-pill ${filtroAtivo === "Retiradas" ? "active-azul" : ""}`}
                onClick={() => setFiltroAtivo("Retiradas")}
              >
                Retiradas
              </button>
            </div>
          </div>
        </div>

        <table className="table-rel">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th>ALUNO</th>
              <th>DATA DA AÇÃO</th>
              <th>STATUS FINAL</th>
              <th>RESPONSÁVEL</th>
              <th>MÉTODO/MOTIVO</th>
            </tr>
          </thead>
          <tbody>
            {logsFiltrados.length > 0 ? (
              logsFiltrados.map((log) => (
                <tr key={log.id}>
                  <td className="idx">{log.id}</td>
                  <td>{log.aluno}</td>
                  <td>{log.data}</td>
                  <td>
                    {log.status === "Desbloqueado" && (
                      <span className="badge-audit desbloq">
                        <i className="ph-bold ph-user-check"></i> Desbloqueado
                      </span>
                    )}
                    {log.status === "Bloqueado" && (
                      <span className="badge-audit bloq">
                        <i className="ph-bold ph-user-x"></i> Bloqueado
                      </span>
                    )}
                    {log.status === "Retirada de Alerta" && (
                      <span className="badge-audit retirada">
                        <i className="ph-bold ph-info"></i> Retirada de Alerta
                      </span>
                    )}
                  </td>
                  <td style={{ fontWeight: "700", color: "#333" }}>
                    {log.responsavel}
                  </td>
                  <td className="italic">{log.motivo}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#888",
                  }}
                >
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="footer-relatorio">
          EXIBINDO {logsFiltrados.length} DE {logsAudit.length} REGISTROS
        </div>
      </div>
    </div>
  );
}
