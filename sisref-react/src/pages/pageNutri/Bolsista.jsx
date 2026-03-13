import React, { useState, useEffect } from "react";
import "./Bolsista.css";

export default function Bolsista() {
  const [bolsistas, setBolsistas] = useState([]);

  // Quando a tela carregar, busca os alunos que são bolsistas
  useEffect(() => {
    const todosAlunos = JSON.parse(localStorage.getItem("alunos_sisref")) || [];

    // Filtra apenas os alunos que têm o campo de bolsista ativado (pode estar como true, 'true' ou 'Sim' dependendo de como foi salvo)
    let apenasBolsistas = todosAlunos.filter(
      (aluno) =>
        aluno.isBolsista === true ||
        aluno.isBolsista === "true" ||
        aluno.isBolsista === "Sim",
    );

    // Garante que todo bolsista tenha o status de permissão inicial, caso nunca tenha sido bloqueado
    apenasBolsistas = apenasBolsistas.map((b) => ({
      ...b,
      statusBolsista: b.statusBolsista || "Desbloqueado",
      permissaoBolsista: b.permissaoBolsista || "AUTORIZADA",
    }));

    setBolsistas(apenasBolsistas);
  }, []);

  // Função inteligente que alterna o status e SALVA NO BANCO
  const toggleStatus = (id) => {
    // 1. Atualiza visualmente na tela
    const novaListaBolsistas = bolsistas.map((bolsista) => {
      if (bolsista.id === id) {
        const isCurrentlyBlocked = bolsista.statusBolsista === "Bloqueado";
        return {
          ...bolsista,
          statusBolsista: isCurrentlyBlocked ? "Desbloqueado" : "Bloqueado",
          permissaoBolsista: isCurrentlyBlocked ? "AUTORIZADA" : "NEGADA",
        };
      }
      return bolsista;
    });

    setBolsistas(novaListaBolsistas);

    // 2. Salva a alteração lá no localStorage dos alunos para não perder quando der F5
    const todosAlunos = JSON.parse(localStorage.getItem("alunos_sisref")) || [];
    const alunosAtualizados = todosAlunos.map((aluno) => {
      // Procura se esse aluno foi um dos bolsistas modificados
      const bolsistaModificado = novaListaBolsistas.find(
        (b) => b.id === aluno.id,
      );
      return bolsistaModificado ? bolsistaModificado : aluno;
    });

    localStorage.setItem("alunos_sisref", JSON.stringify(alunosAtualizados));
  };

  return (
    <>
      <div className="page-header-bolsista">
        <h2>Área do Bolsista</h2>
        <p className="subtitle">Gestão de inspetores e permissões de acesso</p>
      </div>

      <div className="bolsista-card-container">
        {/* Banner Azul de Aviso */}
        <div className="bolsista-alert-box">
          <i className="ph ph-info"></i>
          <p>
            Lógica do Sistema: O sistema gera alertas para faltas ou
            cancelamentos no dia. Ao atingir 3 alertas, o bolsista é bloqueado
            automaticamente para leitura de QR-Codes.
          </p>
        </div>

        <table className="bolsista-table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Status Sistema</th>
              <th>Permissão de Leitura</th>
              <th>Ação de Desbloqueio</th>
              <th>Ação Scanner</th>
            </tr>
          </thead>
          <tbody>
            {bolsistas.length > 0 ? (
              bolsistas.map((bolsista) => (
                <tr key={bolsista.id}>
                  {/* Nome puxado do banco */}
                  <td>{bolsista.nome}</td>

                  {/* Status */}
                  <td>
                    <span
                      className={`status-user-badge ${bolsista.statusBolsista === "Desbloqueado" ? "unlocked" : "locked"}`}
                    >
                      {bolsista.statusBolsista === "Desbloqueado" ? (
                        <i className="ph-bold ph-user-check"></i>
                      ) : (
                        <i className="ph-bold ph-user-x"></i>
                      )}
                      {bolsista.statusBolsista}
                    </span>
                  </td>

                  {/* Permissão */}
                  <td>
                    <span
                      className={`perm-text ${bolsista.permissaoBolsista === "AUTORIZADA" ? "autorizada" : "negada"}`}
                    >
                      {bolsista.permissaoBolsista}
                    </span>
                  </td>

                  {/* Ação Desbloqueio */}
                  <td>
                    {bolsista.statusBolsista === "Desbloqueado" ? (
                      <span className="txt-action-regular">Regular</span>
                    ) : (
                      <button
                        className="btn-action-desbloquear"
                        onClick={() => toggleStatus(bolsista.id)}
                      >
                        Desbloquear
                      </button>
                    )}
                  </td>

                  {/* Ação Scanner */}
                  <td>
                    {bolsista.statusBolsista === "Desbloqueado" ? (
                      <button
                        className="btn-scanner-revogar"
                        onClick={() => toggleStatus(bolsista.id)}
                      >
                        <i className="ph ph-qr-code"></i> Revogar Scanner
                      </button>
                    ) : (
                      <span className="txt-scanner-liberar">
                        LIBERAR SCANNER
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#888",
                  }}
                >
                  Nenhum aluno bolsista cadastrado no sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="bolsista-footer-info">
          EXIBINDO {bolsistas.length} DE {bolsistas.length} REGISTROS
        </div>
      </div>
    </>
  );
}
