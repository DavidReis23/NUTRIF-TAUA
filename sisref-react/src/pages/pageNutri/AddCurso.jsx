import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./AddCurso.css";

export default function AddCurso() {
  const navigate = useNavigate();
  const location = useLocation();
  const cursoParaEditar = location.state?.cursoParaEditar;

  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
    turmas: "",
    nivel: "",
    turno: "",
    coordenador: "",
  });
  const [errors, setErrors] = useState({});
  const [modalState, setModalState] = useState(null);

  useEffect(() => {
    if (cursoParaEditar) {
      setFormData({
        nome: cursoParaEditar.nome || "",
        codigo: cursoParaEditar.codigo || "",
        turmas: cursoParaEditar.turmas || "",
        nivel: cursoParaEditar.nivel || "",
        turno: cursoParaEditar.turno || "",
        coordenador: cursoParaEditar.coordenador || "",
      });
    }
  }, [cursoParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrs = {};
    if (!formData.nome) newErrs.nome = true;
    if (!formData.codigo) newErrs.codigo = true;
    if (!formData.turmas) newErrs.turmas = true;
    if (!formData.nivel) newErrs.nivel = true;
    if (!formData.turno) newErrs.turno = true;
    if (!formData.coordenador) newErrs.coordenador = true;

    if (Object.keys(newErrs).length > 0) {
      setErrors(newErrs);
      setModalState("error");
    } else {
      const novoCurso = {
        id: cursoParaEditar ? cursoParaEditar.id : Date.now(),
        nome: formData.nome,
        codigo: formData.codigo,
        turmas: parseInt(formData.turmas),
        nivel: formData.nivel,
        turno: formData.turno,
        coordenador: formData.coordenador,
        status: cursoParaEditar ? cursoParaEditar.status : "Ativo",
      };

      const salvos = JSON.parse(localStorage.getItem("cursos_sisref")) || [];
      const novaLista = cursoParaEditar
        ? salvos.map((c) => (c.id === cursoParaEditar.id ? novoCurso : c))
        : [...salvos, novoCurso];

      localStorage.setItem("cursos_sisref", JSON.stringify(novaLista));
      setModalState("success");
    }
  };

  return (
    <div className="add-curso-container">
      <div className="page-header-nav">
        <h2>
          <span className="header-link" onClick={() => navigate("/cursos")}>
            Cursos
          </span>
          <i className="ph ph-caret-right"></i>
          <span className="header-current">
            {cursoParaEditar ? "Editar Curso" : "Cadastrar Curso"}
          </span>
        </h2>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="section-title">Dados do Curso</div>

          <div className="form-grid">
            <div className={`input-group ${errors.nome ? "error" : ""}`}>
              <label>
                Nome do Curso <span className="required">*</span>
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: Análise e Desenvolvimento de Sistemas"
              />
              {errors.nome && (
                <span className="error-msg">Campo obrigatório</span>
              )}
            </div>

            <div className="row-split">
              <div className={`input-group ${errors.codigo ? "error" : ""}`}>
                <label>
                  Código <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  placeholder="Ex: 1234"
                />
                {errors.codigo && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
              <div className={`input-group ${errors.turmas ? "error" : ""}`}>
                <label>
                  Quantidade de Turmas <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="turmas"
                  value={formData.turmas}
                  onChange={handleChange}
                  min="1"
                  placeholder="0"
                />
                {errors.turmas && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
            </div>

            <div className="row-split">
              <div className={`input-group ${errors.nivel ? "error" : ""}`}>
                <label>
                  Nível <span className="required">*</span>
                </label>
                <select
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Selecione um Nível
                  </option>
                  <option value="Técnico Integrado">Técnico Integrado</option>
                  <option value="Técnico Subsequente">
                    Técnico Subsequente
                  </option>
                  <option value="Graduação Tecnológica">
                    Graduação Tecnológica
                  </option>
                  <option value="Licenciatura">Licenciatura</option>
                  <option value="Bacharelado">Bacharelado</option>
                </select>
                {errors.nivel && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
              <div className={`input-group ${errors.turno ? "error" : ""}`}>
                <label>
                  Turno <span className="required">*</span>
                </label>
                <select
                  name="turno"
                  value={formData.turno}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Selecione um Turno
                  </option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                  <option value="Integral">Integral</option>
                </select>
                {errors.turno && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
            </div>

            <div className={`input-group ${errors.coordenador ? "error" : ""}`}>
              <label>
                Coordenador <span className="required">*</span>
              </label>
              <input
                type="text"
                name="coordenador"
                value={formData.coordenador}
                onChange={handleChange}
                placeholder="Nome do coordenador"
              />
              {errors.coordenador && (
                <span className="error-msg">Campo obrigatório</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/cursos")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {cursoParaEditar ? "Atualizar" : "Salvar"}
            </button>
          </div>
        </form>
      </div>

      {modalState && (
        <div className="modal-overlay">
          <div
            className={`modal-card-feedback ${modalState === "success" ? "modal-type-success" : "modal-type-error"}`}
          >
            <div className="modal-icon-area">
              <i
                className={
                  modalState === "success"
                    ? "ph ph-check"
                    : "ph ph-warning-circle"
                }
              ></i>
            </div>
            <h3>{modalState === "success" ? "Sucesso!" : "Atenção!"}</h3>
            <p>
              {modalState === "success"
                ? "Operação realizada com sucesso."
                : "Preencha os campos obrigatórios."}
            </p>
            <button
              className="btn-modal"
              onClick={() =>
                modalState === "success"
                  ? navigate("/cursos")
                  : setModalState(null)
              }
            >
              Continuar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
