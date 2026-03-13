import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Cursos.css";

export default function Cursos() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([]);
  const [busca, setBusca] = useState("");

  // Modais
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [cursoSelecionado, setCursoSelecionado] = useState(null);

  // Menu de Status no Modal
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  // Paginação e Ordenação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [sortMode, setSortMode] = useState(null); // 'az', 'newest' ou null (desligado)

  useEffect(() => {
    const salvos = JSON.parse(localStorage.getItem("cursos_sisref")) || [];
    setCursos(salvos);
  }, []);

  // Lógica de Toggle dos Botões de Ordenação
  const handleSortToggle = (mode) => {
    setSortMode((prevMode) => (prevMode === mode ? null : mode));
  };

  // Processamento: Busca e Ordenação
  let cursosProcessados = cursos.filter(
    (curso) =>
      curso.nome.toLowerCase().includes(busca.toLowerCase()) ||
      curso.codigo.toLowerCase().includes(busca.toLowerCase()),
  );

  if (sortMode === "az") {
    cursosProcessados.sort((a, b) => a.nome.localeCompare(b.nome));
  } else if (sortMode === "newest") {
    cursosProcessados.sort((a, b) => b.id - a.id); // O ID é Date.now(), então o maior é o mais recente
  }

  // Lógica de Paginação
  const totalPages = Math.ceil(cursosProcessados.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const cursosDaPagina = cursosProcessados.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  useEffect(() => {
    if (cursosDaPagina.length === 0 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [cursosDaPagina.length, currentPage]);

  const handleDeleteConfirm = () => {
    const novaLista = cursos.filter((c) => c.id !== cursoSelecionado.id);
    setCursos(novaLista);
    localStorage.setItem("cursos_sisref", JSON.stringify(novaLista));
    setIsDeleteModalOpen(false);
    setIsViewModalOpen(false);
    setCursoSelecionado(null);
  };

  const handleEdit = (curso) => {
    navigate("/cursos/adicionar", { state: { cursoParaEditar: curso } });
  };

  // Função disparada DENTRO DO MODAL DE VISÃO para mudar o status
  const changeStatus = (novoStatus) => {
    const novaLista = cursos.map((c) =>
      c.id === cursoSelecionado.id ? { ...c, status: novoStatus } : c,
    );
    setCursos(novaLista);
    localStorage.setItem("cursos_sisref", JSON.stringify(novaLista));

    // Atualiza o curso selecionado para refletir a mudança na hora
    setCursoSelecionado({ ...cursoSelecionado, status: novoStatus });
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
        <h2>Cursos</h2>
        <span className="subtitle">Gestão de gerenciamento de cursos</span>
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
                title="Ligar/Desligar Recentes"
              >
                <i className="ph ph-users-three"></i>
              </button>
            </div>
          </div>

          <div className="search-container">
            <div className="search-box">
              <i className="ph ph-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Buscar curso ou código..."
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
              onClick={() => navigate("/cursos/adicionar")}
            >
              <i className="ph ph-plus-circle"></i> Cadastrar Curso
            </button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: "100px" }}>Código</th>
              <th>Curso</th>
              <th>Nível</th>
              <th style={{ textAlign: "center" }}>Quantidade de Turmas</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {cursosDaPagina.length > 0 ? (
              cursosDaPagina.map((curso) => (
                <tr key={curso.id}>
                  <td style={{ fontWeight: "700", color: "#333" }}>
                    {curso.codigo}
                  </td>
                  <td style={{ fontWeight: "500" }}>{curso.nome}</td>
                  <td>{curso.nivel}</td>
                  <td style={{ textAlign: "center" }}>{curso.turmas}</td>
                  <td style={{ textAlign: "center" }}>
                    <span
                      className={`status-badge ${curso.status === "Ativo" ? "active" : "inactive"}`}
                    >
                      {curso.status}
                    </span>
                  </td>
                  <td>
                    <div className="actions-group">
                      <button
                        className="btn-action-icon view"
                        onClick={() => {
                          setCursoSelecionado(curso);
                          setIsViewModalOpen(true);
                          setIsStatusDropdownOpen(false);
                        }}
                      >
                        <i className="ph ph-eye"></i>
                      </button>
                      <button
                        className="btn-action-icon edit"
                        onClick={() => handleEdit(curso)}
                      >
                        <i className="ph ph-pencil-simple"></i>
                      </button>
                      <button
                        className="btn-action-icon delete"
                        onClick={() => {
                          setCursoSelecionado(curso);
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
                  Nenhum curso encontrado. Cadastre o seu primeiro!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isViewModalOpen && cursoSelecionado && (
        <div
          className="modal-overlay"
          onClick={() => {
            if (isStatusDropdownOpen) setIsStatusDropdownOpen(false);
          }}
        >
          <div className="view-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="view-modal-top">
              <div className="view-breadcrumb">
                Cursos &gt; <span>{cursoSelecionado.nome}</span>
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
                onClick={() => handleEdit(cursoSelecionado)}
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
              <div className="profile-avatar-circle">
                {getInitials(cursoSelecionado.nome)}
              </div>
              <h3>{cursoSelecionado.nome}</h3>
            </div>

            <div className="view-section-title">Dados do Curso</div>
            <table className="view-table">
              <tbody>
                <tr>
                  <td className="label-cell">Nome Curso</td>
                  <td>{cursoSelecionado.nome}</td>
                </tr>
                <tr>
                  <td className="label-cell">Código</td>
                  <td>{cursoSelecionado.codigo}</td>
                </tr>
                <tr>
                  <td className="label-cell">Status</td>
                  <td>
                    <div className="custom-select-wrapper">
                      <div
                        className={`custom-select-trigger ${cursoSelecionado.status === "Ativo" ? "select-ativo" : "select-inativo"}`}
                        onClick={() =>
                          setIsStatusDropdownOpen(!isStatusDropdownOpen)
                        }
                      >
                        {cursoSelecionado.status}{" "}
                        <i className="ph ph-caret-down"></i>
                      </div>

                      {isStatusDropdownOpen && (
                        <div className="custom-select-options">
                          <div
                            className="custom-option opt-ativo"
                            onClick={() => changeStatus("Ativo")}
                          >
                            Ativo
                          </div>
                          <div
                            className="custom-option opt-inativo"
                            onClick={() => changeStatus("Inativo")}
                          >
                            Inativo
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="label-cell">Nível</td>
                  <td>{cursoSelecionado.nivel}</td>
                </tr>
                <tr>
                  <td className="label-cell">Turno</td>
                  <td>{cursoSelecionado.turno}</td>
                </tr>
                <tr>
                  <td className="label-cell">Coordenador</td>
                  <td>{cursoSelecionado.coordenador}</td>
                </tr>
                <tr>
                  <td className="label-cell">Quantidade de Turmas</td>
                  <td>{cursoSelecionado.turmas}</td>
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
            <h3>Excluir Curso</h3>
            <p>
              Você está prestes a excluir permanentemente este curso.
              <br />
              <br />
              Deseja realmente prosseguir?
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
