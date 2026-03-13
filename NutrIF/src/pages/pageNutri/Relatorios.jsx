import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Relatorios.css";

export default function Relatorios() {
  const navigate = useNavigate();
  const [periodo, setPeriodo] = useState("SEMANAL"); // 'SEMANAL' ou 'MENSAL'

  // Dados Mockados idênticos às suas fotos
  const dadosSemanal = {
    cards: {
      compareceram: 210,
      naoCompareceram: 55,
      cancelados: 10,
      total: 275,
    },
    graficoBarras: [
      { label: "SEG", green: 95, red: 40, yellow: 25 },
      { label: "TER", green: 70, red: 15, yellow: 100 },
      { label: "QUA", green: 10, red: 5, yellow: 5 },
      { label: "QUI", green: 15, red: 40, yellow: 15 },
      { label: "SEX", green: 70, red: 100, yellow: 60 },
      { label: "SÁB", green: 40, red: 65, yellow: 35 },
    ],
    graficoRosca: { green: 84, yellow: 8, red: 8 }, // Total 100%
  };

  const dadosMensal = {
    cards: {
      compareceram: 821,
      naoCompareceram: 105,
      cancelados: 210,
      total: 1275,
    },
    graficoBarras: [
      { label: "SEMANA 1", green: 100, red: 40, yellow: 25 },
      { label: "SEMANA 2", green: 70, red: 75, yellow: 100 },
      { label: "SEMANA 3", green: 20, red: 25, yellow: 10 },
      { label: "SEMANA 4", green: 65, red: 80, yellow: 100 },
    ],
    graficoRosca: { green: 84, yellow: 8, red: 8 },
  };

  const dadosAtuais = periodo === "SEMANAL" ? dadosSemanal : dadosMensal;

  // Monta a string do gradient do CSS pra formar a rosca certinha
  const conicString = `conic-gradient(
    #16a34a 0% ${dadosAtuais.graficoRosca.green}%, 
    #eab308 ${dadosAtuais.graficoRosca.green}% ${dadosAtuais.graficoRosca.green + dadosAtuais.graficoRosca.yellow}%, 
    #ef4444 ${dadosAtuais.graficoRosca.green + dadosAtuais.graficoRosca.yellow}% 100%
  )`;

  return (
    <>
      <div className="page-header-relatorios">
        <div>
          <h2>Relatórios Nutricionais</h2>
          <p className="subtitle">
            Gestão de desperdício, presença e auditoria de bloqueios
          </p>
        </div>

        <div className="header-actions-relatorios">
          <button className="btn-download-pdf">
            <i className="ph-bold ph-download-simple"></i> Baixar PDF completo
          </button>

          {/* Navega pra tela que faremos em seguida */}
          <div
            className="btn-presenca-link"
            onClick={() => navigate("/relatorios/presenca")}
          >
            <i className="ph-bold ph-calendar-blank"></i> Presença{" "}
            {periodo === "SEMANAL" ? "Semanal" : "Mensal"}
          </div>

          {/* Toggle Igualzinho do Figma */}
          <div className="toggle-periodo">
            <button
              className={`toggle-btn ${periodo === "SEMANAL" ? "active" : ""}`}
              onClick={() => setPeriodo("SEMANAL")}
            >
              SEMANAL
            </button>
            <button
              className={`toggle-btn ${periodo === "MENSAL" ? "active" : ""}`}
              onClick={() => setPeriodo("MENSAL")}
            >
              MENSAL
            </button>
          </div>
        </div>
      </div>

      {/* Cards Superiores */}
      <div className="summary-cards-grid">
        <div className="summary-card">
          <div className="summary-title">COMPARECERAM</div>
          <div className="summary-value val-green">
            {dadosAtuais.cards.compareceram}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-title">NÃO COMPARECERAM</div>
          <div className="summary-value val-red">
            {dadosAtuais.cards.naoCompareceram}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-title">CANCELADOS</div>
          <div className="summary-value val-yellow">
            {dadosAtuais.cards.cancelados}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-title">TOTAL PREVISTO</div>
          <div className="summary-value val-blue">
            {dadosAtuais.cards.total}
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">
            <i className="ph-bold ph-chart-bar"></i> Consumo por Refeição (
            {periodo === "SEMANAL" ? "Semanal" : "Mensal"})
          </div>

          <div className="bar-chart-area">
            <div className="y-axis">
              <span>100</span>
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {dadosAtuais.graficoBarras.map((item, index) => (
              <div key={index} className="bar-group">
                <div
                  className="bar green"
                  style={{ height: `${item.green}%` }}
                ></div>
                <div
                  className="bar red"
                  style={{ height: `${item.red}%` }}
                ></div>
                <div
                  className="bar yellow"
                  style={{ height: `${item.yellow}%` }}
                ></div>
                <span className="x-label">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color green"></div>
              <div className="legend-text">
                <span className="legend-title">COMPARECEU</span>
                <span className="legend-desc">
                  Alunos que realizaram o check-in no horário da refeição via
                  QR-Code.
                </span>
              </div>
            </div>
            <div className="legend-item">
              <div className="legend-color red"></div>
              <div className="legend-text">
                <span className="legend-title">NÃO COMPARECEU</span>
                <span className="legend-desc">
                  Alunos confirmados que não realizaram a leitura do código no
                  dia.
                </span>
              </div>
            </div>
            <div className="legend-item">
              <div className="legend-color yellow"></div>
              <div className="legend-text">
                <span className="legend-title">CANCELADOS</span>
                <span className="legend-desc">
                  Refeições canceladas pelos alunos dentro do prazo limite
                  estabelecido.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-card">
          <div
            className="chart-header"
            style={{ justifyContent: "center", color: "#555" }}
          >
            TAXA DE PRESENÇA
          </div>

          <div className="donut-chart-container">
            <div className="donut-chart" style={{ background: conicString }}>
              <div className="donut-inner">
                <h4>84%</h4>
                <span>EFICIÊNCIA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caixa Inferior Clicável (Abre Auditoria) */}
      <div
        className="audit-preview-card"
        onClick={() => navigate("/relatorios/auditoria")}
      >
        <div className="audit-header">
          <div className="audit-title-area">
            <div className="audit-icon-box">
              <i className="ph-fill ph-file-text"></i>
            </div>
            <div>
              <h3>Auditoria de Bloqueios e Desbloqueios</h3>
              <p>
                Histórico de ações manuais e automáticas no sistema de acesso
              </p>
            </div>
          </div>
          <button className="btn-export" onClick={(e) => e.stopPropagation()}>
            <i className="ph ph-download-simple"></i> Exportar Tabela
          </button>
        </div>

        <table className="preview-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>ALUNO</th>
              <th>DATA DA AÇÃO</th>
              <th>STATUS FINAL</th>
              <th>RESPONSÁVEL</th>
              <th>MÉTODO/MOTIVO</th>
            </tr>
          </thead>
          <tbody>
            {/* Tabela embaçada simulando o preview que você desenhou */}
            <tr>
              <td style={{ textAlign: "left" }}>Alice Maria de Lima Melo</td>
              <td>02/02/2026</td>
              <td>Desbloqueado</td>
              <td>Nutri. Micaele</td>
              <td>Justificativa Médica</td>
            </tr>
            <tr>
              <td
                colSpan="5"
                style={{
                  paddingTop: "20px",
                  color: "#999",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                }}
              >
                CLIQUE AQUI PARA VER O HISTÓRICO COMPLETO
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
