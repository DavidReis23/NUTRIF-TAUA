import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./QrCode.css";
import "./QrCodeLista.css";

export default function QrCodeLista() {
  const location = useLocation();

  const refeicao = location.state?.refeicao || {
    nome: "Refeição Padrão",
    desc: "Descrição Padrão",
    hora: "00:00",
  };

  const [busca, setBusca] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("Todos");
  const [isSortedAZ, setIsSortedAZ] = useState(false);

  // Paginação fixada em 20
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const [alunos, setAlunos] = useState([
    {
      id: 1,
      nome: "Zendaya Alves de Lima",
      curso: "Análise e Desenvolvimento de Sistemas",
      status: "Compareceu",
    },
    {
      id: 2,
      nome: "Alice Maria de Lima Melo",
      curso: "Análise e Desenvolvimento de Sistemas",
      status: "Aguardando",
    },
    {
      id: 3,
      nome: "Bruno César da Costa",
      curso: "Análise e Desenvolvimento de Sistemas",
      status: "Não Compareceu",
    },
    {
      id: 4,
      nome: "Carlos Eduardo Santos",
      curso: "Análise e Desenvolvimento de Sistemas",
      status: "Aguardando",
    },
    {
      id: 5,
      nome: "Daniela Ferreira Gomes",
      curso: "Análise e Desenvolvimento de Sistemas",
      status: "Compareceu",
    },
    {
      id: 6,
      nome: "Elias Rodrigues Neto",
      curso: "Análise e Desenvolvimento de Sistemas",
      status: "Não Compareceu",
    },
  ]);

  const handleMarcarPresenca = (id, novoStatus) => {
    setAlunos(
      alunos.map((a) => (a.id === id ? { ...a, status: novoStatus } : a)),
    );
  };

  // 1. Filtra por aba e busca
  let alunosProcessados = alunos.filter((a) => {
    const matchBusca = a.nome.toLowerCase().includes(busca.toLowerCase());
    if (abaAtiva === "Compareceram")
      return matchBusca && a.status === "Compareceu";
    if (abaAtiva === "NaoCompareceram")
      return matchBusca && a.status === "Não Compareceu";
    return matchBusca;
  });

  // 2. Ordena se o botão A-Z estiver ativo
  if (isSortedAZ) {
    alunosProcessados.sort((a, b) => a.nome.localeCompare(b.nome));
  }

  // 3. Paginação de 20 em 20
  const totalPages = Math.ceil(alunosProcessados.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const alunosDaPagina = alunosProcessados.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <>
      <div className="page-header-qr">
        <div>
          <h2>
            <Link
              to="/qrcode"
              style={{ color: "#333", textDecoration: "none" }}
            >
              QR-Code
            </Link>{" "}
            &gt;{" "}
            <span style={{ fontWeight: 500, color: "#666" }}>
              {refeicao.nome}
            </span>
          </h2>
          <p className="subtitle">
            {refeicao.desc} - {refeicao.hora}
          </p>
        </div>
        <button className="btn-liberar-leitura">
          <i className="ph ph-lock-key-open"></i> Liberar Bolsista para Leitura
        </button>
      </div>

      <div className="qr-lista-container">
        <div className="alert-box">
          <div className="alert-content">
            <i className="ph-fill ph-warning-circle"></i>
            <div className="alert-text">
              <h4>INFORMATIVO DO SISTEMA</h4>
              <p>
                Os status são atualizados em tempo real conforme a leitura do
                QR-Code pelo bolsista.
              </p>
            </div>
          </div>
          <div className="alert-limit">
            <i className="ph ph-clock"></i> LIMITE: 10:00
          </div>
        </div>

        <div className="qr-toolbar">
          <div className="qr-toolbar-left">
            <span className="label-sort">Ordenar:</span>
            <button
              className={`btn-sort ${isSortedAZ ? "active-sort" : ""}`}
              onClick={() => setIsSortedAZ(!isSortedAZ)}
              title="Ordenar de A a Z"
            >
              <i className="ph ph-sort-ascending"></i>
            </button>

            <div className="search-box" style={{ width: "350px" }}>
              <i className="ph ph-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Buscar..."
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
          </div>

          <div
            className="qr-toolbar-right"
            style={{ display: "flex", alignItems: "center", gap: "20px" }}
          >
            <div className="pagination-top">
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage <= 1}
              >
                <i className="ph ph-caret-left"></i>
              </button>
              <button
                className="page-btn active"
                style={{ background: "#6BCB77", color: "white" }}
              >
                {currentPage}
              </button>
              <button
                className="page-btn"
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage >= totalPages || totalPages === 0}
              >
                <i className="ph ph-caret-right"></i>
              </button>
            </div>

            <div className="status-tabs">
              <button
                className={`tab-pill ${abaAtiva === "Todos" ? "active-todos" : ""}`}
                onClick={() => {
                  setAbaAtiva("Todos");
                  setCurrentPage(1);
                }}
              >
                Todos
              </button>
              <button
                className={`tab-pill ${abaAtiva === "Compareceram" ? "active-compareceram" : ""}`}
                onClick={() => {
                  setAbaAtiva("Compareceram");
                  setCurrentPage(1);
                }}
              >
                Compareceram
              </button>
              <button
                className={`tab-pill ${abaAtiva === "NaoCompareceram" ? "active-naocompareceram" : ""}`}
                onClick={() => {
                  setAbaAtiva("NaoCompareceram");
                  setCurrentPage(1);
                }}
              >
                Não Compareceram
              </button>
            </div>
          </div>
        </div>

        <table className="data-table qr-table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}>#</th>
              <th>Nome Completo</th>
              <th>Curso</th>
              <th>Comparecimento</th>
              <th style={{ textAlign: "center" }}>Ação</th>
            </tr>
          </thead>
          <tbody>
            {alunosDaPagina.map((aluno, idx) => (
              <tr key={aluno.id}>
                <td style={{ color: "#888" }}>
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>
                <td style={{ fontWeight: "500", color: "#333" }}>
                  {aluno.nome}
                </td>
                <td>{aluno.curso}</td>
                <td>
                  {aluno.status === "Compareceu" && (
                    <span className="status-compareceu">
                      <i className="ph-bold ph-check-circle"></i> COMPARECEU
                    </span>
                  )}
                  {aluno.status === "Não Compareceu" && (
                    <span className="status-nao-compareceu">
                      <i className="ph-bold ph-x-circle"></i> NÃO COMPARECEU
                    </span>
                  )}
                  {aluno.status === "Aguardando" && (
                    <span className="status-aguardando">
                      Aguardando Leitura...
                    </span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  {aluno.status === "Compareceu" ? (
                    <span style={{ fontSize: "0.8rem", color: "#999" }}>
                      Lançada
                    </span>
                  ) : (
                    <div className="action-buttons-qr">
                      <button
                        className="btn-qr-action check"
                        title="Marcar Presença"
                        onClick={() =>
                          handleMarcarPresenca(aluno.id, "Compareceu")
                        }
                      >
                        <i className="ph-bold ph-check"></i>
                      </button>
                      <button
                        className="btn-qr-action cross"
                        title="Marcar Falta"
                        onClick={() =>
                          handleMarcarPresenca(aluno.id, "Não Compareceu")
                        }
                      >
                        <i className="ph-bold ph-x"></i>
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {alunosDaPagina.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  style={{ textAlign: "center", padding: "30px" }}
                >
                  Nenhum registro encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="footer-info">
          EXIBINDO {alunosDaPagina.length} DE {alunosProcessados.length}{" "}
          REGISTROS
        </div>
      </div>
    </>
  );
}
