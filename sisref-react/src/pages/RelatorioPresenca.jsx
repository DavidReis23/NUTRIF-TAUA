import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./RelatorioDetalhes.css";

export default function RelatorioPresenca() {
  const navigate = useNavigate();

  // Controle de Abas
  const [modo, setModo] = useState("SEMANAL"); // 'SEMANAL' ou 'MENSAL'
  const [abaAtiva, setAbaAtiva] = useState("SEMANA 1");
  const [busca, setBusca] = useState("");

  const [presencas, setPresencas] = useState([]);

  // Quando muda o modo, ajusta a primeira aba selecionada
  useEffect(() => {
    setAbaAtiva(modo === "SEMANAL" ? "SEMANA 1" : "JAN");
  }, [modo]);

  useEffect(() => {
    // PUXA OS ALUNOS REAIS DO BANCO DE DADOS
    const alunos = JSON.parse(localStorage.getItem("alunos_sisref")) || [];

    // Gera a lista de presença com base nos alunos reais
    const gerado = alunos.map((aluno, index) => ({
      id: index + 1,
      aluno: aluno.nome,
      curso: aluno.curso1 || "Análise e Desenvolvimento de Sistemas",
      // Cria uma aleatoriedade para ficar realista
      status: index % 3 === 0 ? "NÃO COMPARECEU" : "COMPARECEU",
    }));

    setPresencas(gerado);
  }, []);

  const presencasFiltradas = presencas.filter((p) =>
    p.aluno.toLowerCase().includes(busca.toLowerCase()),
  );

  const abasSemanais = ["SEMANA 1", "SEMANA 2", "SEMANA 3", "SEMANA 4"];
  const abasMensais = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN"];

  return (
    <div className="relatorio-detalhe-container">
      <div className="header-voltar" style={{ alignItems: "center" }}>
        <div className="title-area-voltar">
          <button
            className="btn-voltar-icon"
            onClick={() => navigate("/relatorios")}
          >
            <i className="ph ph-caret-left"></i>
          </button>
          <div>
            <h2>
              Relatórios de Presença {modo === "SEMANAL" ? "Semanal" : "Mensal"}
            </h2>
            <p className="subtitle">
              Gestão de desperdício, presença e auditoria de bloqueios
            </p>
          </div>
        </div>

        {/* Toggle Semanal / Mensal do Figma */}
        <div className="toggle-periodo">
          <button
            className={`toggle-btn ${modo === "SEMANAL" ? "active" : ""}`}
            onClick={() => setModo("SEMANAL")}
          >
            SEMANAL
          </button>
          <button
            className={`toggle-btn ${modo === "MENSAL" ? "active" : ""}`}
            onClick={() => setModo("MENSAL")}
          >
            MENSAL
          </button>
        </div>
      </div>

      {/* Navegação de Abas inferior (As palavras cinzas que ficam verdes) */}
      <div className="nav-abas-presenca">
        {modo === "SEMANAL"
          ? abasSemanais.map((aba) => (
              <div
                key={aba}
                className={`aba-presenca ${abaAtiva === aba ? "active" : ""}`}
                onClick={() => setAbaAtiva(aba)}
              >
                {aba}
              </div>
            ))
          : abasMensais.map((aba) => (
              <div
                key={aba}
                className={`aba-presenca ${abaAtiva === aba ? "active" : ""}`}
                onClick={() => setAbaAtiva(aba)}
              >
                {aba}
              </div>
            ))}
        {modo === "MENSAL" && (
          <div className="aba-presenca">
            <i
              className="ph ph-caret-right"
              style={{ fontSize: "1.2rem", marginTop: "-3px" }}
            ></i>
          </div>
        )}
      </div>

      <div className="tabela-relatorio-card">
        <div className="header-tabela-presenca">
          <h3>
            <i className="ph-fill ph-calendar-blank"></i> Listagem: {abaAtiva}
          </h3>
          <button className="btn-exportar-topo">
            <i className="ph ph-download-simple"></i> Exportar Tabela
          </button>
        </div>

        <div className="toolbar-relatorio" style={{ marginTop: "20px" }}>
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
              <button className="page-btn">2</button>
              <button className="page-btn" style={{ border: "none" }}>
                ...
              </button>
              <button className="page-btn">50</button>
              <button className="page-btn">
                <i className="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>

        <table className="table-rel">
          <thead>
            <tr>
              <th style={{ paddingLeft: "20px" }}>ALUNO</th>
              <th>CURSO</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {presencasFiltradas.length > 0 ? (
              presencasFiltradas.map((p, idx) => (
                <tr key={idx}>
                  <td style={{ paddingLeft: "20px" }}>{p.aluno}</td>
                  <td className="italic">{p.curso}</td>
                  <td>
                    {p.status === "COMPARECEU" ? (
                      <span className="txt-compareceu">
                        <i className="ph-bold ph-check-circle"></i> COMPARECEU
                      </span>
                    ) : (
                      <span className="txt-falta">
                        <i className="ph-bold ph-x-circle"></i> NÃO COMPARECEU
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#888",
                  }}
                >
                  Nenhum aluno encontrado para {abaAtiva}.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="footer-relatorio">
          EXIBINDO {presencasFiltradas.length} DE {presencas.length} REGISTROS
        </div>
      </div>
    </div>
  );
}
