import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Alunos.css";

export default function Alunos() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState("");

  // Modais
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Paginação e Ordenação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const [sortMode, setSortMode] = useState(null);

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("alunos_sisref")) || [];
    setAlunos(salvos);
  }, []);

  const handleSortToggle = (mode) => {
    setSortMode((prevMode) => (prevMode === mode ? null : mode));
  };

  // Busca Inteligente: Procura por nome, matrícula 1 ou matrícula 2!
  let alunosProcessados = alunos.filter(
    (aluno) =>
      aluno.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (aluno.matricula1 && aluno.matricula1.includes(busca)) ||
      (aluno.matricula2 && aluno.matricula2.includes(busca)),
  );

  if (sortMode === "az") {
    alunosProcessados.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (sortMode === "newest") {
    alunosProcessados.sort((a, b) => b.id - a.id);
  }

  const totalPages = Math.ceil(alunosProcessados.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const alunosDaPagina = alunosProcessados.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  useEffect(() => {
    if (alunosDaPagina.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [alunosDaPagina.length, currentPage]);

  const handleDeleteConfirm = () => {
    const novaLista = alunos.filter((a) => a.id !== alunoSelecionado.id);
    setAlunos(novaLista);
    localStorage.setItem("alunos_sisref", JSON.stringify(novaLista));
    setIsDeleteModalOpen(false);
    setIsViewModalOpen(false);
    setAlunoSelecionado(null);
  };

  const handleEdit = (aluno) => {
    navigate("/alunos/adicionar", { state: { alunoParaEditar: aluno } });
  };

  const changeStatus = (novoStatus) => {
    const novaLista = alunos.map((a) =>
      a.id === alunoSelecionado.id ? { ...a, status: novoStatus } : a,
    );
    setAlunos(novaLista);
    localStorage.setItem("alunos_sisref", JSON.stringify(novaLista));

    setAlunoSelecionado({ ...alunoSelecionado, status: novoStatus });
    setIsStatusDropdownOpen(false);
  };

  const getInitials = (name) => {
    const words = name.trim().split(" ");
    if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <>
      <div className="page-header">
        <h2>Alunos</h2>
        <span className="subtitle">
          Gestão de leituras e conferência de presença
        </span>
      </div>

      <div className="table-card">
        <div className="toolbar">
          <div className="toolbar-left">
            <button className="btn-filter">
              <i className="ph-fill ph-funnel"></i> Filtro
            </button>
            <div className="sort-group">
              <span className="label-sort">Ordenar:</span>
              <button
                className={`btn-sort ${sortMode === "az" ? "active-sort" : ""}`}
                onClick={() => handleSortToggle("az")}
                title="Ligar/Desligar A-Z"
              >
                <i className="ph ph-sort-ascending"></i>
              </button>
              <button
                className={`btn-sort ${sortMode === "newest" ? "active-sort" : ""}`}
                onClick={() => handleSortToggle("newest")}
                title="Mais Recentes"
              >
                <i className="ph ph-users"></i>
              </button>
            </div>
          </div>

          <div className="search-container">
            <div className="search-box">
              <i className="ph ph-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Buscar aluno ou matrícula..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div className="toolbar-right">
            <div className="pagination-top">
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage <= 1}
              >
                <i className="ph ph-caret-left"></i>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= totalPages || totalPages === 0}
              >
                <i className="ph ph-caret-right"></i>
              </button>
            </div>
            <button
              className="btn-add-outline"
              onClick={() => navigate("/alunos/adicionar")}
            >
              <i className="ph ph-plus-circle"></i> Cadastrar Aluno
            </button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>Nº</th>
              <th>Nome Completo</th>
              <th>Turma</th>
              <th>Email</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {alunosDaPagina.length > 0 ? (
              alunosDaPagina.map((aluno, index) => (
                <tr key={aluno.id}>
                  <td style={{ fontWeight: "700", color: "#666" }}>
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td style={{ fontWeight: "500" }}>{aluno.nome}</td>

                  {/* === A TABELA NO 2 CURSOS=== */}
                  <td>
                    <div style={{ fontWeight: "500", color: "#333" }}>
                      {aluno.curso1 || "-"}
                    </div>

                    {/* Se tiver curso 2, mostra  embaixo */}
                    {aluno.curso2 && (
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#666",
                          marginTop: "4px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span
                          style={{
                            backgroundColor: "#E8F5E9",
                            color: "#2E7D32",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontWeight: "700",
                            fontSize: "0.65rem",
                          }}
                        >
                          2º
                        </span>
                        {aluno.curso2}
                      </div>
                    )}
                  </td>

                  <td>{aluno.email}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      className={`status-badge ${aluno.status === "Ativo" ? "active" : "blocked"}`}
                    >
                      {aluno.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions-group">
                      <button
                        className="btn-action-icon view"
                        onClick={() => {
                          setAlunoSelecionado(aluno);
                          setIsViewModalOpen(true);
                          setIsStatusDropdownOpen(false);
                        }}
                      >
                        <i className="ph ph-eye"></i>
                      </button>
                      <button
                        className="btn-action-icon edit"
                        onClick={() => handleEdit(aluno)}
                      >
                        <i className="ph ph-pencil-simple"></i>
                      </button>
                      <button
                        className="btn-action-icon delete"
                        onClick={() => {
                          setAlunoSelecionado(aluno);
                          setIsDeleteModalOpen(true);
                        }}
                      >
                        <i className="ph ph-trash"></i>
                      </button>
                    </div>
                  </td>
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
                  Nenhum aluno encontrado. Comece a cadastrar!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isViewModalOpen && alunoSelecionado && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (isStatusDropdownOpen) setIsStatusDropdownOpen(false);
          }}
        >
          <div className="view-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="view-modal-top">
              <div className="view-breadcrumb">
                Alunos &gt; <span>{alunoSelecionado.nome}</span>
              </div>
              <button
                className="btn-back-txt"
                onClick={() => setIsViewModalOpen(false)}
              >
                &lt; Voltar
              </button>
            </div>

            <div className="view-modal-actions-top">
              <button
                className="btn-outline-green"
                onClick={() => handleEdit(alunoSelecionado)}
              >
                Editar
              </button>
              <button
                className="btn-outline-red"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                Excluir
              </button>
            </div>

            <div className="view-profile-header">
              <div className="profile-identity">
                <div className="profile-avatar-circle">
                  {getInitials(alunoSelecionado.nome)}
                </div>
                <h3>{alunoSelecionado.nome}</h3>
              </div>
              <span
                className={`status-badge ${alunoSelecionado.status === "Ativo" ? "active" : "blocked"}`}
              >
                {alunoSelecionado.status}
              </span>
            </div>

            <div className="view-section-title">Dados Individuais</div>
            <table className="view-table">
              <tbody>
                <tr>
                  <td className="label-cell">Nome Completo</td>
                  <td>{alunoSelecionado.nome}</td>
                </tr>
                <tr>
                  <td className="label-cell">Email</td>
                  <td>{alunoSelecionado.email}</td>
                </tr>
                <tr>
                  <td className="label-cell">Bolsista</td>
                  <td style={{ fontWeight: "600" }}>
                    {alunoSelecionado.isBolsista ? "Sim" : "Não"}
                  </td>
                </tr>

                <tr>
                  <td className="label-cell">Curso Principal</td>
                  <td>{alunoSelecionado.curso1 || "-"}</td>
                </tr>
                <tr>
                  <td className="label-cell">Matrícula Principal</td>
                  <td>{alunoSelecionado.matricula1 || "-"}</td>
                </tr>

                {alunoSelecionado.curso2 && (
                  <>
                    <tr>
                      <td className="label-cell">Curso Secundário</td>
                      <td>{alunoSelecionado.curso2}</td>
                    </tr>
                    <tr>
                      <td className="label-cell">Matrícula Secundária</td>
                      <td>{alunoSelecionado.matricula2 || "-"}</td>
                    </tr>
                  </>
                )}

                <tr>
                  <td className="label-cell">Status</td>
                  <td>
                    <div
                      className={`custom-select-wrapper ${isStatusDropdownOpen ? "open" : ""}`}
                    >
                      <div
                        className={`custom-select-trigger ${alunoSelecionado.status === "Ativo" ? "select-ativo" : "select-bloqueado"}`}
                        onClick={() =>
                          setIsStatusDropdownOpen(!isStatusDropdownOpen)
                        }
                      >
                        {alunoSelecionado.status}{" "}
                        <i className="ph ph-caret-down"></i>
                      </div>
                      <div className="custom-select-options">
                        <div
                          className="custom-option"
                          onClick={() => changeStatus("Ativo")}
                        >
                          Ativo
                        </div>
                        <div
                          className="custom-option"
                          onClick={() => changeStatus("Bloqueado")}
                        >
                          Bloqueado
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">Restrição Alimentar</td>
                  <td>
                    {alunoSelecionado.restricoes &&
                    alunoSelecionado.restricoes.length > 0 ? (
                      <span
                        style={{
                          background: "#FFEBEE",
                          color: "#C62828",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "0.85rem",
                          fontWeight: "500",
                        }}
                      >
                        {alunoSelecionado.restricoes.join(", ")}
                      </span>
                    ) : (
                      "Nenhuma"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <i
              className="ph ph-x modal-close-corner"
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                fontSize: "1.2rem",
                color: "#999",
              }}
              onClick={() => setIsDeleteModalOpen(false)}
            ></i>
            <div className="delete-icon-wrapper">
              <i className="ph ph-warning-octagon"></i>
            </div>
            <h3>Excluir Usuário</h3>
            <p>
              Você está prestes a excluir permanentemente o usuário do sistema.
              Essa ação é irreversível.
              <br />
              <br />
              Deseja prosseguir?
            </p>
            <div className="modal-actions-custom">
              <button
                className="btn-cancel-custom"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="btn-delete-custom"
                onClick={handleDeleteConfirm}
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
