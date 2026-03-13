import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [cardapios, setCardapios] = useState([]);

  const [refeicaoAtual, setRefeicaoAtual] = useState("");
  const [semanaOffset, setSemanaOffset] = useState(0);

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("cardapios_sisref")) || [];
    setCardapios(salvos);
  }, []);

  useEffect(() => {
    const atualizarRefeicao = () => {
      const agora = new Date();
      const hora = agora.getHours();
      const minuto = agora.getMinutes();
      const horaMinuto = hora * 100 + minuto;

      let refeicao = "";
      if (horaMinuto >= 700 && horaMinuto <= 925) {
        refeicao = "LANCHE DA MANHÃ";
      } else if (horaMinuto >= 926 && horaMinuto <= 1150) {
        refeicao = "ALMOÇO";
      } else if (horaMinuto >= 1151 && horaMinuto <= 1500) {
        refeicao = "LANCHE DA TARDE";
      } else if (horaMinuto >= 1501 && horaMinuto <= 2000) {
        refeicao = "JANTAR";
      } else {
        refeicao = "FORA_DE_HORARIO";
      }
      setRefeicaoAtual(refeicao);
    };

    atualizarRefeicao();
    const intervalo = setInterval(atualizarRefeicao, 60000);
    return () => clearInterval(intervalo);
  }, []);

  const formatarHorarioCompleto = (tipo) => {
    const mapa = {
      "LANCHE DA MANHÃ": "Lanche da Manhã - 09:25",
      ALMOÇO: "Almoço - 11:50",
      "LANCHE DA TARDE": "Lanche da Tarde - 15:00",
      JANTAR: "Jantar - 19:00",
    };
    return mapa[tipo] || tipo;
  };

  const cardapiosFiltrados =
    refeicaoAtual === "FORA_DE_HORARIO"
      ? []
      : cardapios.filter(
          (c) => c.tipo && c.tipo.toUpperCase() === refeicaoAtual,
        );

  const navegarSemana = (direcao) => {
    if (direcao === "prev") setSemanaOffset(semanaOffset - 1);
    if (direcao === "next") setSemanaOffset(semanaOffset + 1);
  };

  const getTextoSemana = () => {
    if (semanaOffset === 0) return "Exibindo a semana atual";
    if (semanaOffset === 1) return "Exibindo a próxima semana";
    if (semanaOffset === -1) return "Exibindo a semana passada";
    if (semanaOffset > 1) return `Exibindo ${semanaOffset} semanas à frente`;
    if (semanaOffset < -1)
      return `Exibindo ${Math.abs(semanaOffset)} semanas atrás`;
  };

  return (
    <div className="dashboard-container">
      <div className="dash-left-column">
        <div className="welcome-banner">
          <h1>Olá, Micaelle! 😉</h1>
          <p>
            Gerencie o cardápio e tenha acesso a todas as funcionalidades do
            SISREF
          </p>
        </div>

        <div className="section-header-dash">
          {cardapiosFiltrados.length > 0 ? (
            <div>
              <h2>Cardápio - {formatarHorarioCompleto(refeicaoAtual)}</h2>
              <p>{getTextoSemana()}</p>
            </div>
          ) : (
            <div>
              <h2>Cardápio</h2>
              <p>Clique em adicionar um cardápio!</p>
            </div>
          )}

          <div className="dash-controls">
            <button
              className="btn-add-dash"
              onClick={() => navigate("/cardapio/adicionar")}
            >
              <i className="ph ph-plus-circle"></i> Adicionar cardápio
            </button>
            <div className="dash-arrows">
              <button onClick={() => navegarSemana("prev")}>
                <i className="ph ph-caret-left"></i>
              </button>
              <button onClick={() => navegarSemana("next")}>
                <i className="ph ph-caret-right"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="dash-meals-grid">
          {cardapiosFiltrados.length > 0 ? (
            cardapiosFiltrados.map((card) => (
              <div
                key={card.id}
                className="dash-meal-card"
                onClick={() => navigate("/cardapio")}
              >
                <h3 className="dash-meal-title">{card.prato}</h3>

                <div className="dash-meal-tags">
                  {/* Ordem idêntica à sua Foto 1 */}
                  {card.fruta && (
                    <span className="meal-tag">
                      <i className="ph ph-apple-logo"></i> {card.fruta}
                    </span>
                  )}
                  {card.sobremesa && (
                    <span className="meal-tag">
                      <i className="ph ph-cookie"></i> {card.sobremesa}
                    </span>
                  )}
                  {card.bebida && (
                    <span className="meal-tag">
                      <i className="ph ph-drop"></i> {card.bebida}
                    </span>
                  )}
                </div>

                {card.obs && (
                  <div className="dash-meal-obs">
                    <i className="ph-fill ph-warning"></i> {card.obs}
                  </div>
                )}

                <div className="dash-meal-footer">
                  <div className="dash-meal-footer-left">
                    <span className="footer-time">
                      {card.tipo} - {card.hora}
                    </span>
                    <span className="footer-day">
                      {cardAtualizaNomeDia(card.dia)}
                    </span>
                  </div>
                  <i className="ph-bold ph-caret-double-right"></i>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-dash-box">Nenhum cardápio adicionado.</div>
          )}
        </div>
      </div>

      <div className="dash-right-column">
        <div className="widget-card">
          <div className="widget-header">
            <h3>Quantitativo</h3>
            <select className="widget-select">
              <option>(03/11 - 07/11)</option>
            </select>
          </div>
          <div className="widget-filters">
            <button className="w-filter-btn active">Todos</button>
            <button className="w-filter-btn">Ontem</button>
            <button className="w-filter-btn">Há 1 semana</button>
            <button className="w-filter-btn">Há 1 mês</button>
          </div>
        </div>
        <div className="widget-card">
          <div className="widget-header">
            <h3>Notificações</h3>
            <select className="widget-select">
              <option>(03/11 - 07/11)</option>
            </select>
          </div>
          <div className="widget-filters">
            <button className="w-filter-btn active">Todos</button>
            <button className="w-filter-btn">Ontem</button>
            <button className="w-filter-btn">Há 1 semana</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function cardAtualizaNomeDia(diaStr) {
  if (!diaStr) return "";
  return diaStr.charAt(0).toUpperCase() + diaStr.slice(1);
}
