import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./AddAluno.css";

export default function AddAluno() {
  const navigate = useNavigate();
  const location = useLocation();
  const alunoParaEditar = location.state?.alunoParaEditar;

  const [cursosAtivos, setCursosAtivos] = useState([]);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    nascimento: "",
    curso1: "",
    matricula1: "",
    curso2: "",
    matricula2: "",
    isBolsista: false,
    restricoes: [],
  });

  const [errors, setErrors] = useState({});
  const [modalState, setModalState] = useState(null);

  useEffect(() => {
    // FILTRA SOMENTE OS CURSOS ATIVOS PARA O SELECT
    const salvos = JSON.parse(localStorage.getItem("cursos_sisref")) || [];
    const ativos = salvos.filter((c) => c.status === "Ativo");
    setCursosAtivos(ativos);

    if (alunoParaEditar) {
      setFormData({
        nome: alunoParaEditar.nome || "",
        email: alunoParaEditar.email || "",
        nascimento: alunoParaEditar.nascimento || "",
        curso1: alunoParaEditar.curso1 || "",
        matricula1: alunoParaEditar.matricula1 || "",
        curso2: alunoParaEditar.curso2 || "",
        matricula2: alunoParaEditar.matricula2 || "",
        isBolsista: alunoParaEditar.isBolsista || false,
        restricoes: alunoParaEditar.restricoes || [],
      });
    }
  }, [alunoParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: false });
  };

  const handleTagAdd = (e) => {
    const val = e.target.value;
    if (val && !formData.restricoes.includes(val)) {
      setFormData({ ...formData, restricoes: [...formData.restricoes, val] });
    }
    e.target.value = "";
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      restricoes: formData.restricoes.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrs = {};

    if (!formData.nome) newErrs.nome = true;
    if (!formData.email) newErrs.email = true;
    if (!formData.nascimento) newErrs.nascimento = true;
    if (!formData.curso1) newErrs.curso1 = true;
    if (!formData.matricula1) newErrs.matricula1 = true;

    // Matrícula 2 obrigatória apenas se Curso 2 for preenchido
    if (formData.curso2 && formData.curso2 !== "" && !formData.matricula2) {
      newErrs.matricula2 = true;
    }

    if (Object.keys(newErrs).length > 0) {
      setErrors(newErrs);
      setModalState("error");
    } else {
      const novoAluno = {
        id: alunoParaEditar ? alunoParaEditar.id : Date.now(),
        nome: formData.nome,
        email: formData.email,
        nascimento: formData.nascimento,
        curso1: formData.curso1,
        matricula1: formData.matricula1,
        curso2: formData.curso2,
        matricula2: formData.matricula2,
        isBolsista: formData.isBolsista,
        restricoes: formData.restricoes,
        status: alunoParaEditar ? alunoParaEditar.status : "Ativo",
      };

      const salvos = JSON.parse(localStorage.getItem("alunos_sisref")) || [];
      const novaLista = alunoParaEditar
        ? salvos.map((a) => (a.id === alunoParaEditar.id ? novoAluno : a))
        : [...salvos, novoAluno];

      localStorage.setItem("alunos_sisref", JSON.stringify(novaLista));
      setModalState("success");
    }
  };

  return (
    <div className="add-aluno-container">
      <div className="page-header-nav">
        <h2>
          <Link to="/alunos" className="header-link">
            Alunos
          </Link>
          <i className="ph ph-caret-right"></i>
          <span className="header-current">
            {alunoParaEditar ? "Editar Aluno" : "Cadastrar Aluno"}
          </span>
        </h2>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="section-header-box" style={{ marginTop: 0 }}>
            <h4>
              Dados Pessoais
              <div className="toggle-wrapper">
                <span className="toggle-label">Bolsista</span>
                <i
                  className={
                    formData.isBolsista
                      ? "ph-fill ph-toggle-right"
                      : "ph-fill ph-toggle-left"
                  }
                  style={{
                    fontSize: "2.4rem",
                    color: formData.isBolsista ? "#6BCB77" : "#ccc",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      isBolsista: !formData.isBolsista,
                    })
                  }
                ></i>
                <span
                  className="toggle-text"
                  style={{ color: formData.isBolsista ? "#6BCB77" : "#999" }}
                >
                  {formData.isBolsista ? "Sim" : "Não"}
                </span>
              </div>
            </h4>
          </div>

          <div className="form-grid">
            <div className={`input-group ${errors.nome ? "error" : ""}`}>
              <label>
                Nome Completo <span className="required">*</span>
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Ex: David da Silva dos Reis"
              />
              {errors.nome && (
                <span className="error-msg">Campo obrigatório</span>
              )}
            </div>

            <div className="row-split">
              <div className={`input-group ${errors.email ? "error" : ""}`}>
                <label>
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ex: email@gmail.com"
                />
                {errors.email && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
              <div
                className={`input-group ${errors.nascimento ? "error" : ""}`}
              >
                <label>
                  Data de Nascimento <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="nascimento"
                  value={formData.nascimento}
                  onChange={handleChange}
                />
                {errors.nascimento && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
            </div>

            <div className="section-header-box">
              <h4>Vínculo Institucional</h4>
            </div>

            <div className="row-split">
              <div className={`input-group ${errors.curso1 ? "error" : ""}`}>
                <label>
                  <span>
                    Curso Principal <span className="required">*</span>
                  </span>
                  <Link to="/cursos/adicionar" className="link-novo">
                    <i className="ph ph-plus-circle"></i> Novo
                  </Link>
                </label>
                <select
                  name="curso1"
                  value={formData.curso1}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Selecione...
                  </option>
                  {cursosAtivos.length === 0 && (
                    <option disabled>Nenhum curso ativo encontrado</option>
                  )}
                  {cursosAtivos.map((c) => (
                    <option key={c.id} value={c.nome}>
                      {c.nome}
                    </option>
                  ))}
                </select>
                {errors.curso1 && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
              <div
                className={`input-group ${errors.matricula1 ? "error" : ""}`}
              >
                <label>
                  Matrícula 1 <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="matricula1"
                  value={formData.matricula1}
                  onChange={handleChange}
                />
                {errors.matricula1 && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
            </div>

            <div className="row-split">
              <div className="input-group">
                <label>Curso Secundário (Opcional)</label>
                <select
                  name="curso2"
                  value={formData.curso2}
                  onChange={handleChange}
                >
                  <option value="">Nenhum</option>
                  {cursosAtivos.map((c) => (
                    <option key={c.id} value={c.nome}>
                      {c.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div
                className={`input-group ${errors.matricula2 ? "error" : ""}`}
              >
                <label>
                  Matrícula 2{" "}
                  {formData.curso2 && <span className="required">*</span>}
                </label>
                <input
                  type="text"
                  name="matricula2"
                  value={formData.matricula2}
                  onChange={handleChange}
                />
                {errors.matricula2 && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
            </div>

            <div className="section-header-box">
              <h4>Saúde</h4>
            </div>

            <div className="input-group">
              <label>Restrições Alimentares</label>
              <div className="multi-select-box">
                <div className="tags-area">
                  {formData.restricoes.map((tag) => (
                    <div key={tag} className="restricao-tag">
                      <span>{tag}</span>{" "}
                      <i className="ph ph-x" onClick={() => removeTag(tag)}></i>
                    </div>
                  ))}
                </div>
                <select
                  className="select-transparent"
                  onChange={handleTagAdd}
                  value=""
                >
                  <option value="" disabled hidden>
                    Adicionar restrição...
                  </option>
                  <option value="Intolerância a Lactose">
                    Intolerância a Lactose
                  </option>
                  <option value="Intolerância a Glúten">
                    Intolerância a Glúten
                  </option>
                  <option value="Diabetes">Diabetes</option>
                  <option value="Alergia a Marisco">Alergia a Marisco</option>
                  <option value="Alergia a Amendoim">Alergia a Amendoim</option>
                  <option value="Alergia a Leite">Alergia a Leite</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/alunos")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {alunoParaEditar ? "Atualizar" : "Salvar"}
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
                ? "Aluno salvo com sucesso."
                : "Preencha os campos obrigatórios."}
            </p>
            <button
              className="btn-modal"
              onClick={() =>
                modalState === "success"
                  ? navigate("/alunos")
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
