import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cardapio.css";

export default function Cardapio() {
  const navigate = useNavigate();
  const [cardapios, setCardapios] = useState([]);

  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

  const [isDeleteSingleModalOpen, setIsDeleteSingleModalOpen] = useState(false);
  const [refeicaoSelecionada, setRefeicaoSelecionada] = useState(null);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("cardapios_sisref")) || [];
    setCardapios(salvos);
  }, []);

  const handleEdit = (refeicao) => {
    navigate("/cardapio/adicionar", {
      state: { cardapioParaEditar: refeicao },
    });
  };

  const toggleCardSelection = (id) => {
    if (selectedCards.includes(id)) {
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      setSelectedCards([...selectedCards, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedCards.length === cardapios.length) {
      setSelectedCards([]);
    } else {
      setSelectedCards(cardapios.map((c) => c.id));
    }
  };

  const cancelDeleteMode = () => {
    setIsDeleteMode(false);
    setSelectedCards([]);
  };

  const handleDeleteSingleConfirm = () => {
    if (refeicaoSelecionada) {
      const novaLista = cardapios.filter(
        (c) => c.id !== refeicaoSelecionada.id,
      );
      setCardapios(novaLista);
      localStorage.setItem("cardapios_sisref", JSON.stringify(novaLista));
      setIsDeleteSingleModalOpen(false);
      setRefeicaoSelecionada(null);
    }
  };

  const handleBulkDeleteConfirm = () => {
    const novaLista = cardapios.filter((c) => !selectedCards.includes(c.id));
    setCardapios(novaLista);
    localStorage.setItem("cardapios_sisref", JSON.stringify(novaLista));

    setIsBulkDeleteModalOpen(false);
    cancelDeleteMode();
  };

  const dias = [
    {
      key: "segunda",
      label: "SEGUNDA - FEIRA",
      nomeFormatado: "Segunda-feira",
    },
    { key: "terca", label: "TERÇA - FEIRA", nomeFormatado: "Terça-feira" },
    { key: "quarta", label: "QUARTA - FEIRA", nomeFormatado: "Quarta-feira" },
    { key: "quinta", label: "QUINTA - FEIRA", nomeFormatado: "Quinta-feira" },
    { key: "sexta", label: "SEXTA - FEIRA", nomeFormatado: "Sexta-feira" },
    { key: "sabado", label: "SÁBADO", nomeFormatado: "Sábado" },
  ];

  const getNomeDia = (chave) => {
    const diaEncontrado = dias.find((d) => d.key === chave);
    return diaEncontrado ? diaEncontrado.nomeFormatado : "";
  };

  return (
    <>
      <div className="page-header-cardapio">
        <div>
          <h2>
            Cardápio{" "}
            {isDeleteMode && (
              <span className="header-breadcrumb-extra">
                &gt; Excluir Cardápio
              </span>
            )}
          </h2>
          <p className="subtitle">Gerenciamento semanal</p>
        </div>

        <div className="header-actions-cardapio">
          {!isDeleteMode ? (
            <>
              <button
                className="btn-outline-red"
                onClick={() => setIsDeleteMode(true)}
              >
                <i className="ph ph-trash"></i> Excluir Cardápio Semanal
              </button>
              <button
                className="btn-add-green"
                onClick={() => navigate("/cardapio/adicionar")}
              >
                <i className="ph ph-plus-circle"></i> Adicionar cardápio
              </button>
              <div className="nav-arrows">
                <button>
                  <i className="ph ph-caret-left"></i>
                </button>
                <button>
                  <i className="ph ph-caret-right"></i>
                </button>
              </div>
            </>
          ) : (
            <>
              <button className="btn-select-all" onClick={handleSelectAll}>
                <i className="ph ph-check-circle"></i> Selecionar Tudo
              </button>
              <button className="btn-cancel-mode" onClick={cancelDeleteMode}>
                Cancelar
              </button>
              <button
                className="btn-confirm-delete"
                onClick={() => setIsBulkDeleteModalOpen(true)}
                disabled={selectedCards.length === 0}
              >
                Excluir
              </button>
            </>
          )}
        </div>
      </div>

      <div className="kanban-board-container">
        <div className="kanban-board">
          {dias.map((dia) => (
            <div key={dia.key} className="kanban-column">
              <div className="column-title">{dia.label}</div>

              {cardapios
                .filter((c) => c.dia === dia.key)
                .sort((a, b) => a.hora.localeCompare(b.hora))
                .map((refeicao) => {
                  const isSelected = selectedCards.includes(refeicao.id);
                  return (
                    <div
                      key={refeicao.id}
                      className={`meal-item-card ${isDeleteMode ? "selectable" : ""} ${isSelected ? "selected-for-delete" : ""}`}
                      onClick={() => {
                        if (isDeleteMode) toggleCardSelection(refeicao.id);
                      }}
                    >
                      <div className="meal-item-header">
                        <span className="meal-item-time">
                          {refeicao.hora} - {refeicao.tipo}
                        </span>

                        {!isDeleteMode && (
                          <div className="meal-item-actions">
                            <i
                              className="ph ph-pencil-simple"
                              title="Editar"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEdit(refeicao);
                              }}
                            ></i>
                            <i
                              className="ph ph-trash"
                              title="Excluir"
                              onClick={(e) => {
                                e.stopPropagation();
                                setRefeicaoSelecionada(refeicao);
                                setIsDeleteSingleModalOpen(true);
                              }}
                            ></i>
                          </div>
                        )}
                      </div>

                      <h4 className="meal-item-prato">{refeicao.prato}</h4>

                      <div className="meal-items-list">
                        {refeicao.bebida && (
                          <div className="meal-item-tag-simple">
                            <i className="ph ph-drop"></i> {refeicao.bebida}
                          </div>
                        )}
                        {refeicao.fruta && (
                          <div className="meal-item-tag-simple">
                            <i className="ph ph-apple-logo"></i>{" "}
                            {refeicao.fruta}
                          </div>
                        )}
                        {refeicao.sobremesa && (
                          <div className="meal-item-tag-simple">
                            <i className="ph ph-cookie"></i>{" "}
                            {refeicao.sobremesa}
                          </div>
                        )}
                      </div>

                      {refeicao.obs && (
                        <div className="meal-item-obs">
                          <i className="ph-fill ph-warning-circle"></i>{" "}
                          {refeicao.obs}
                        </div>
                      )}

                      {isDeleteMode && (
                        <div className="checkbox-circle">
                          {isSelected && <i className="ph-bold ph-check"></i>}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>

      {/* Modal Individual */}
      {isDeleteSingleModalOpen && refeicaoSelecionada && (
        <div
          className="modal-overlay"
          onClick={() => setIsDeleteSingleModalOpen(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <i
              className="ph ph-x modal-close-corner"
              onClick={() => setIsDeleteSingleModalOpen(false)}
            ></i>
            <div className="delete-icon-wrapper">
              <i className="ph ph-warning-octagon"></i>
            </div>

            <h3>Excluir Cardápio</h3>
            <p style={{ marginBottom: "10px" }}>
              Você está prestes a excluir permanentemente o cardápio do{" "}
              <strong>{refeicaoSelecionada.tipo}</strong> da{" "}
              <strong>{getNomeDia(refeicaoSelecionada.dia)}</strong> do sistema.
              <br />
              Essa ação é irreversível.
            </p>
            <p>Deseja realmente prosseguir com a exclusão?</p>

            <div className="modal-actions-custom">
              <button
                className="btn-cancel-custom"
                onClick={() => setIsDeleteSingleModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-delete-custom"
                onClick={handleDeleteSingleConfirm}
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}

      {isBulkDeleteModalOpen && (
        <div
          className="modal-overlay"
          onClick={() => setIsBulkDeleteModalOpen(false)}
        >
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <i
              className="ph ph-x modal-close-corner"
              onClick={() => setIsBulkDeleteModalOpen(false)}
            ></i>
            <div className="delete-icon-wrapper">
              <i className="ph ph-warning-octagon"></i>
            </div>

            <h3>Excluir Cardápio</h3>
            <p style={{ marginBottom: "10px" }}>
              Você está prestes a excluir permanentemente{" "}
              <strong>{selectedCards.length} cardápios selecionados</strong> do
              sistema.
              <br />
              Essa ação é irreversível.
            </p>
            <p>Deseja realmente prosseguir com a exclusão?</p>

            <div className="modal-actions-custom">
              <button
                className="btn-cancel-custom"
                onClick={() => setIsBulkDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-delete-custom"
                onClick={handleBulkDeleteConfirm}
              >
                Sim, Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
