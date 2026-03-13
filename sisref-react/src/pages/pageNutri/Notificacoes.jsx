import React, { useState, useEffect } from "react";
import "./Notificacoes.css";

export default function Notificacoes() {
  // Controle de Navegação Interna da Tela
  const [activeTab, setActiveTab] = useState("bloqueios"); // 'bloqueios' ou 'reclamacoes'
  const [detalhesAluno, setDetalhesAluno] = useState(null); // Se tiver um aluno aqui, mostra a tela de detalhes

  // Controle de Modais
  const [modalType, setModalType] = useState(null); // 'justificativa' ou 'sucesso'

  // Dados Reais (puxados do localStorage e transformados para o layout)
  const [notificacoes, setNotificacoes] = useState([]);
  const [reclamacoes, setReclamacoes] = useState([]);

  useEffect(() => {
    // Busca os alunos reais
    const alunosSalvos =
      JSON.parse(localStorage.getItem("alunos_sisref")) || [];

    // Se não tiver aluno nenhum, cria uns fakes só pra não ficar vazio
    const alunosList =
      alunosSalvos.length > 0
        ? alunosSalvos
        : [
            { id: 1, nome: "Marília da Silva Feitosa", curso1: "ADS" },
            { id: 2, nome: "Lucas Eduardo Oliveira", curso1: "Letras" },
            { id: 3, nome: "David da Silva dos Reis", curso1: "Agropecuária" },
            { id: 4, nome: "Alice Maria de Lima Melo", curso1: "Informática" },
          ];

    // Mapeia os primeiros alunos para os 3 estados da Foto 638
    const mockNotificacoes = [];
    if (alunosList[0])
      mockNotificacoes.push({
        id: 1,
        nome: alunosList[0].nome,
        curso: alunosList[0].curso1,
        tipo: "BLOQUEADO",
        qtd: 3,
        desc: "Atingiu o limite de faltas.",
        tempo: "HÁ 10 MIN",
      });
    if (alunosList[1])
      mockNotificacoes.push({
        id: 2,
        nome: alunosList[1].nome,
        curso: alunosList[1].curso1,
        tipo: "BLOQUEADO",
        qtd: 3,
        desc: "Atingiu o limite de faltas.",
        tempo: "HÁ 2H",
      });
    if (alunosList[2])
      mockNotificacoes.push({
        id: 3,
        nome: alunosList[2].nome,
        curso: alunosList[2].curso1,
        tipo: "ALERTA",
        qtd: 1,
        desc: "Confirmação sem comparecimento",
        tempo: "HÁ 3H",
      });
    if (alunosList[3])
      mockNotificacoes.push({
        id: 4,
        nome: alunosList[3].nome,
        curso: alunosList[3].curso1,
        tipo: "QR-CODE",
        desc: "Liberação do QR-Code",
        tempo: "ONTEM",
      });

    setNotificacoes(mockNotificacoes);

    // Reclamações (Foto 641)
    setReclamacoes([
      {
        id: 101,
        nome: alunosList[3] ? alunosList[3].nome : "Alice",
        curso: "ADS",
        desc: '"Faltou talheres"',
        refeicao: "ALMOÇO (24/11)",
        tempo: "HÁ 10 MIN",
      },
      {
        id: 102,
        nome: "Mateus Ribeiro Ferreira",
        curso: "LETRAS",
        desc: '"O arroz estava muito salgado"',
        refeicao: "JANTAR (23/11)",
        tempo: "HÁ 10H",
      },
    ]);
  }, []);

  const handleOpenDetalhes = (aluno) => {
    setDetalhesAluno(aluno);
  };

  const handleCloseDetalhes = () => {
    setDetalhesAluno(null);
  };

  const handleOpenJustificativa = () => {
    setModalType("justificativa");
  };

  const handleAceitarJustificativa = () => {
    setModalType("sucesso");
  };

  const fecharModais = () => {
    setModalType(null);
  };

  // ============================================================================
  // RENDERIZAÇÃO DA TELA DE DETALHES (Fotos 639 e 640)
  // ============================================================================
  if (detalhesAluno) {
    const isBloqueado = detalhesAluno.tipo === "BLOQUEADO";

    return (
      <div className="notificacoes-container">
        <button className="btn-voltar-simples" onClick={handleCloseDetalhes}>
          <i className="ph ph-caret-left"></i> Voltar para Notificações
        </button>

        <div className="detail-card">
          {/* Banner Colorido */}
          <div className={`detail-banner ${isBloqueado ? "red" : "orange"}`}>
            <div className="banner-info-left">
              <div className="banner-icon">
                {isBloqueado ? (
                  <i className="ph-light ph-user-x"></i>
                ) : (
                  <i className="ph-light ph-warning"></i>
                )}
              </div>
              <div className="banner-text">
                <h3>{detalhesAluno.nome}</h3>
                <p>
                  {detalhesAluno.curso} - {detalhesAluno.qtd} Alertas de Sistema
                </p>
              </div>
            </div>
            {isBloqueado && (
              <button className="btn-desbloquear-agora">
                <i className="ph-bold ph-lock-open"></i> Desbloquear Agora
              </button>
            )}
          </div>

          {/* Conteúdo Inferior Branco */}
          <div className="detail-content">
            <div className="history-section">
              <h4>
                <i className="ph-bold ph-clock-counter-clockwise"></i> Histórico
                de Ocorrências
              </h4>

              <div className="history-list">
                {/* Clicar no histórico abre o Modal de Justificativa */}
                <div className="history-item" onClick={handleOpenJustificativa}>
                  <div className="history-item-left">
                    <span className="date">01/02/2026</span>
                    <p>Falta sem cancelamento (Almoço)</p>
                    <span className="alerta-num">ALERTA 1</span>
                  </div>
                  <i className="ph ph-caret-right"></i>
                </div>

                {isBloqueado && (
                  <>
                    <div
                      className="history-item"
                      onClick={handleOpenJustificativa}
                    >
                      <div className="history-item-left">
                        <span className="date">03/02/2026</span>
                        <p>Falta sem cancelamento (Jantar)</p>
                        <span className="alerta-num">ALERTA 2</span>
                      </div>
                      <i className="ph ph-caret-right"></i>
                    </div>
                    <div
                      className="history-item"
                      onClick={handleOpenJustificativa}
                    >
                      <div className="history-item-left">
                        <span className="date">06/02/2026</span>
                        <p>Falta sem cancelamento (Almoço)</p>
                        <span className="alerta-num red">
                          BLOQUEIO AUTOMÁTICO
                        </span>
                      </div>
                      <i className="ph ph-caret-right"></i>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="guidelines-box">
              <h4>
                <i className="ph-bold ph-info"></i> Diretrizes do Sistema
              </h4>
              <p>
                O aluno é bloqueado automaticamente ao atingir{" "}
                <strong>3 alertas</strong> de falta sem justificativa ou
                cancelamento prévio.
              </p>
              <p>
                O desbloqueio manual pela nutricionista reinicia o contador de
                alertas do aluno para a semana corrente e é registrada com seu{" "}
                <strong>nome no histórico de auditoria</strong>.
              </p>

              <div className="info-alert-inline">
                <i className="ph-fill ph-warning-circle"></i>
                <p>
                  Lembre-se de validar se houve justificativa não registrada
                  antes de proceder com o desbloqueio.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL 1: Justificativa (Foto 643 - Esquerda) */}
        {modalType === "justificativa" && (
          <div className="modal-notif-overlay">
            <div className="modal-notif-card">
              <button className="btn-close-modal" onClick={fecharModais}>
                <i className="ph-bold ph-x"></i>
              </button>

              <div className="modal-header-notif">
                <i className="ph-fill ph-file-text"></i>
                <h3>Justificativa de Falta</h3>
              </div>

              <div className="modal-grid-2">
                <div>
                  <span className="input-label">Aluno</span>
                  <span className="input-value">{detalhesAluno.nome}</span>
                </div>
                <div>
                  <span className="input-label">Data da Refeição</span>
                  <span className="input-value">01/02/2026</span>
                </div>
              </div>

              <span className="input-label">
                <i className="ph ph-text-align-left"></i> Detalhes da
                Justificativa
              </span>
              <div className="justificativa-box">
                "Tive imprevisto médico e não consegui cancelar a tempo, por
                isso não pude comparecer ao almoço."
              </div>

              <span className="input-label">
                <i className="ph ph-paperclip"></i> Anexos
              </span>
              <div className="anexo-box">
                <span>certificado_visita_medica.pdf</span>
                <i className="ph-bold ph-download-simple"></i>
              </div>

              <span className="input-label" style={{ color: "#22c55e" }}>
                Motivo da Retirada do Alerta (Nutricionista)
              </span>
              <select className="select-motivo">
                <option>Selecione o motivo da retirada...</option>
                <option>Motivos de Saúde</option>
                <option>Questões Legais e Documentais</option>
                <option>Visita Técnica</option>
                <option>Cancelamento em Eventos Oficiais</option>
              </select>

              <div className="alert-warning-text">
                <i className="ph-bold ph-warning"></i> Após a confirmação o
                alerta será retirado do histórico de ocorrências.
              </div>

              <div className="modal-actions-notif">
                <button className="btn-recusar" onClick={fecharModais}>
                  <i className="ph-bold ph-x"></i> Recusar
                </button>
                <button
                  className="btn-aceitar"
                  onClick={handleAceitarJustificativa}
                >
                  <i className="ph-bold ph-check"></i> Aceitar e Limpar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL 2: Sucesso (Foto 643 - Meio) */}
        {modalType === "sucesso" && (
          <div className="modal-notif-overlay">
            <div
              className="modal-notif-card"
              style={{ textAlign: "center", padding: "40px" }}
            >
              <div className="success-icon-big">
                <i className="ph-bold ph-check"></i>
              </div>
              <h3
                style={{
                  fontSize: "1.4rem",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                Alerta Removido com Sucesso!
              </h3>
              <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
                A retirada do alerta foi processada e o motivo técnico foi
                devidamente registrado no histórico de auditoria.
              </p>

              <div className="log-resumo">
                <div className="log-resumo-title">Resumo do Log</div>

                <div className="log-item">
                  <i
                    className="ph-bold ph-shield-check"
                    style={{ background: "#e0e7ff", color: "#3b82f6" }}
                  ></i>
                  <div className="text-col">
                    <strong>Ação de Auditoria</strong>
                    <span>Retirada de Alerta</span>
                  </div>
                </div>
                <div className="log-item">
                  <i
                    className="ph-bold ph-user"
                    style={{ background: "#fef3c7", color: "#d97706" }}
                  ></i>
                  <div className="text-col">
                    <strong>Responsável Registrado</strong>
                    <span>Nutricionista Micaelle de Lima Melo</span>
                  </div>
                </div>
                <div className="log-item">
                  <i
                    className="ph-bold ph-paper-plane-tilt"
                    style={{ background: "#dcfce7", color: "#22c55e" }}
                  ></i>
                  <div className="text-col">
                    <strong>Notificação Enviada</strong>
                    <span>
                      Email encaminhado para o aluno confirmando a retirada.
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="btn-voltar-sucesso"
                onClick={() => {
                  fecharModais();
                  handleCloseDetalhes();
                }}
              >
                Voltar para Notificações
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ============================================================================
  // RENDERIZAÇÃO DA TELA DE LISTA PRINCIPAL (Fotos 638 e 641)
  // ============================================================================
  return (
    <div className="notificacoes-container">
      <div className="page-header-notif">
        <h2>Notificações</h2>
        <p className="subtitle">Gerencie bloqueios e reclamações de alunos</p>
      </div>

      <div className="notif-tabs">
        <div
          className={`notif-tab ${activeTab === "bloqueios" ? "active" : ""}`}
          onClick={() => setActiveTab("bloqueios")}
        >
          <i className="ph-bold ph-lock-key"></i> Bloqueios e Alertas
        </div>
        <div
          className={`notif-tab ${activeTab === "reclamacoes" ? "active" : ""}`}
          onClick={() => setActiveTab("reclamacoes")}
        >
          <i className="ph-bold ph-chat-circle-text"></i> Reclamações Recebidas
        </div>
      </div>

      <div className="notif-list">
        {/* ABA: BLOQUEIOS E ALERTAS */}
        {activeTab === "bloqueios" &&
          notificacoes.map((notif) => (
            <div className="notif-card" key={notif.id}>
              <div className="notif-info-area">
                <div
                  className={`notif-icon ${notif.tipo === "BLOQUEADO" ? "red" : notif.tipo === "ALERTA" ? "orange" : "green"}`}
                >
                  {notif.tipo === "BLOQUEADO" && (
                    <i className="ph-bold ph-user-minus"></i>
                  )}
                  {notif.tipo === "ALERTA" && (
                    <i className="ph-bold ph-warning"></i>
                  )}
                  {notif.tipo === "QR-CODE" && (
                    <i className="ph-bold ph-qr-code"></i>
                  )}
                </div>

                <div className="notif-text">
                  <h4>
                    {notif.nome}
                    <span
                      className={`badge ${notif.tipo === "BLOQUEADO" ? "red" : notif.tipo === "ALERTA" ? "orange" : "green"}`}
                    >
                      {notif.tipo}
                    </span>
                  </h4>
                  <p>
                    {notif.desc}{" "}
                    <span className="notif-time">{notif.tempo}</span>
                  </p>
                </div>
              </div>

              <div>
                {notif.tipo === "QR-CODE" ? (
                  <button className="btn-notif-green">
                    <i className="ph-bold ph-shield-check"></i> Liberar Bolsista
                  </button>
                ) : (
                  <button
                    className="btn-notif-outline"
                    onClick={() => handleOpenDetalhes(notif)}
                  >
                    Ver Ocorrências
                  </button>
                )}
              </div>
            </div>
          ))}

        {/* ABA: RECLAMAÇÕES */}
        {activeTab === "reclamacoes" &&
          reclamacoes.map((rec) => (
            <div className="notif-card" key={rec.id}>
              <div className="notif-info-area">
                <div className="notif-icon gray">
                  <i className="ph-fill ph-chat-circle-text"></i>
                </div>

                <div className="notif-text">
                  <h4>
                    {rec.nome}
                    <span className="badge gray">{rec.refeicao}</span>
                  </h4>
                  <p style={{ color: "#333", fontStyle: "italic" }}>
                    {rec.desc}{" "}
                    <span className="notif-time">
                      {rec.tempo} - {rec.curso}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <button
                  className="btn-check-circle"
                  title="Marcar como resolvido"
                >
                  <i className="ph-bold ph-check"></i>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
