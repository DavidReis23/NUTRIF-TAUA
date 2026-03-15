import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./QrCode.css";

export default function QrCode() {
  const navigate = useNavigate();
  const [diaAtivo, setDiaAtivo] = useState("Segunda");
  const [isRestrictedOpen, setIsRestrictedOpen] = useState(false);
  const [cardapiosDoDia, setCardapiosDoDia] = useState([]);

  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sáb"];

  // Mapa de tradução para ler o que está salvo no banco
  const mapaDiasBanco = {
    Segunda: "segunda",
    Terça: "terca",
    Quarta: "quarta",
    Quinta: "quinta",
    Sexta: "sexta",
    Sáb: "sabado",
  };

  useEffect(() => {
    const todosCardapios =
      JSON.parse(localStorage.getItem("cardapios_sisref")) || [];
    const diaNoBanco = mapaDiasBanco[diaAtivo];

    const filtrados = todosCardapios.filter((c) => c.dia === diaNoBanco);
    setCardapiosDoDia(filtrados);
  }, [diaAtivo]);

  const handleAbrirChamada = (refeicao) => {
    // BLOQUEIO: Se não for segunda-feira, não deixa abrir!
    if (diaAtivo !== "Segunda") {
      setIsRestrictedOpen(true);
      return;
    }
    // Formata os dados para passar pra tela de lista
    navigate("/qrcode/lista", {
      state: {
        refeicao: {
          nome: refeicao.tipo,
          desc: refeicao.prato,
          hora: refeicao.hora,
        },
      },
    });
  };

  return (
    <>
      <div className="page-header-qr">
        <div>
          <h2>QR-Code</h2>
          <p className="subtitle">
            Gestão de leituras e conferência de presença
          </p>
        </div>
        <button className="btn-liberar-leitura">
          <i className="ph ph-lock-key-open"></i> Liberar Bolsista para Leitura
        </button>
      </div>

      <div className="days-tabs">
        {diasSemana.map((dia) => (
          <div
            key={dia}
            className={`day-tab ${diaAtivo === dia ? "active" : ""}`}
            onClick={() => setDiaAtivo(dia)}
          >
            {dia}
          </div>
        ))}
      </div>

      <div className="qr-dashboard-grid">
        <div className="mobile-reader-card">
          <div className="mobile-icon-box">
            <i className="ph ph-device-mobile"></i>
          </div>
          <h3>Leitura Mobile</h3>
          <p>
            Para ler o QR-Code dos alunos, utilize o{" "}
            <strong>SISREF no Smartphone</strong>. O acesso desktop é destinado
            apenas para conferência e supervisão das listas.
          </p>

          <button className="btn-scanner-app">
            <i
              className="ph-fill ph-qr-code"
              style={{ fontSize: "1.8rem" }}
            ></i>
            <div className="scan-text">
              <span className="scan-title">SCANNER APP</span>
              <span className="scan-sub">Nutricionista Logada</span>
            </div>
          </button>

          <a className="help-link">Veja ajuda sobre leitura</a>
        </div>

        <div>
          <div className="meals-area-title">
            <i className="ph ph-device-mobile"></i> Conferência de Listas
            (Refeições do Dia)
          </div>

          <div className="meals-grid">
            {cardapiosDoDia.length > 0 ? (
              cardapiosDoDia.map((ref) => (
                <div key={ref.id} className="meal-action-card">
                  <div>
                    <div className="meal-card-top">
                      <span className="meal-time-badge">{ref.hora}</span>
                      <i className="ph-light ph-user"></i>
                    </div>
                    <h4>{ref.tipo}</h4>
                    <div className="meal-desc">{ref.prato}</div>
                  </div>

                  <div className="meal-card-bottom">
                    <span className="meal-confirmed">CONFIRMADOS: 150</span>
                    <button
                      className="btn-abrir-chamada"
                      onClick={() => handleAbrirChamada(ref)}
                    >
                      ABRIR CHAMADA <i className="ph-bold ph-eye"></i>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-qr-box">
                Nenhuma refeição cadastrada para {diaAtivo}-feira.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE ACESSO RESTRITO */}
      {isRestrictedOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsRestrictedOpen(false)}
        >
          <div
            className="restricted-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="restricted-close"
              onClick={() => setIsRestrictedOpen(false)}
            >
              <i className="ph ph-x"></i>
            </button>
            <div className="restricted-icon-circle">
              <i className="ph ph-warning"></i>
            </div>
            <h3>ACESSO RESTRITO</h3>
            <p>
              O cardápio e a lista de confirmações de{" "}
              <strong>{diaAtivo}-feira</strong> só estarão disponíveis para
              acesso no próprio dia, entre <strong>07:30 e 22:00</strong>.
            </p>
            <button
              className="btn-restricted-back"
              onClick={() => setIsRestrictedOpen(false)}
            >
              Voltar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
