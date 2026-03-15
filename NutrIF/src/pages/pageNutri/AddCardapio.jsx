import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./AddCardapio.css";

export default function AddCardapio() {
  const navigate = useNavigate();
  const location = useLocation();

  // Pega os dados se estiver vindo do botão "Editar"
  const cardapioParaEditar = location.state?.cardapioParaEditar;

  const [formData, setFormData] = useState({
    dia: "",
    tipo: "",
    prato: "",
    fruta: "",
    sobremesa: "",
    bebida: "",
    obs: "",
  });

  const [errors, setErrors] = useState({});
  const [modalState, setModalState] = useState(null);

  // Se tiver edição, preenche o form
  useEffect(() => {
    if (cardapioParaEditar) {
      setFormData({
        dia: cardapioParaEditar.dia || "",
        tipo: cardapioParaEditar.tipo || "",
        prato: cardapioParaEditar.prato || "",
        fruta: cardapioParaEditar.fruta || "",
        sobremesa: cardapioParaEditar.sobremesa || "",
        bebida: cardapioParaEditar.bebida || "",
        obs: cardapioParaEditar.obs || "",
      });
    }
  }, [cardapioParaEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrs = {};

    if (!formData.dia) newErrs.dia = true;
    if (!formData.tipo) newErrs.tipo = true;
    if (!formData.prato) newErrs.prato = true;
    if (!formData.bebida) newErrs.bebida = true;

    if (Object.keys(newErrs).length > 0) {
      setErrors(newErrs);
      setModalState("error");
    } else {
      let horaSalva = "";
      if (formData.tipo === "Lanche da Manhã") horaSalva = "09:25";
      else if (formData.tipo === "Almoço") horaSalva = "11:30";
      else if (formData.tipo === "Lanche da Tarde") horaSalva = "15:00";
      else if (formData.tipo === "Jantar") horaSalva = "19:00";

      const novoCardapio = {
        // Mantém o ID antigo se for edição, ou cria um novo se for cadastro
        id: cardapioParaEditar ? cardapioParaEditar.id : Date.now(),
        dia: formData.dia,
        tipo: formData.tipo,
        hora: horaSalva,
        prato: formData.prato,
        fruta: formData.fruta,
        sobremesa: formData.sobremesa,
        bebida: formData.bebida,
        obs: formData.obs,
      };

      const salvos = JSON.parse(localStorage.getItem("cardapios_sisref")) || [];

      // Se for edição ele mapeia e substitui o existente. Se não for, ele adiciona na lista
      const novaLista = cardapioParaEditar
        ? salvos.map((c) => (c.id === cardapioParaEditar.id ? novoCardapio : c))
        : [...salvos, novoCardapio];

      localStorage.setItem("cardapios_sisref", JSON.stringify(novaLista));

      setModalState("success");
    }
  };

  return (
    <div className="add-cardapio-container">
      <div className="page-header-nav">
        <h2>
          <Link to="/cardapio" className="header-link">
            Cardápio
          </Link>
          <i className="ph ph-caret-right"></i>
          <span className="header-current">
            {cardapioParaEditar ? "Editar Cardápio" : "Adicionar Cardápio"}
          </span>
        </h2>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="row-split">
              <div className={`input-group ${errors.dia ? "error" : ""}`}>
                <label>
                  Dia da Semana <span className="required">*</span>
                </label>
                <select name="dia" value={formData.dia} onChange={handleChange}>
                  <option value="" disabled hidden>
                    Selecione um dia
                  </option>
                  <option value="segunda">Segunda</option>
                  <option value="terca">Terça</option>
                  <option value="quarta">Quarta</option>
                  <option value="quinta">Quinta</option>
                  <option value="sexta">Sexta</option>
                  <option value="sabado">Sábado</option>
                </select>
                {errors.dia && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>

              <div className={`input-group ${errors.tipo ? "error" : ""}`}>
                <label>
                  Horário <span className="required">*</span>
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    Selecione um horário
                  </option>
                  <option value="Lanche da Manhã">Manhã</option>
                  <option value="Almoço">Almoço</option>
                  <option value="Lanche da Tarde">Lanche da Tarde</option>
                  <option value="Jantar">Jantar</option>
                </select>
                {errors.tipo && (
                  <span className="error-msg">Campo obrigatório</span>
                )}
              </div>
            </div>

            <div className={`input-group ${errors.prato ? "error" : ""}`}>
              <label>
                Prato Principal <span className="required">*</span>
              </label>
              <input
                type="text"
                name="prato"
                value={formData.prato}
                onChange={handleChange}
                placeholder="Ex: Pão com patê de frango"
              />
              {errors.prato && (
                <span className="error-msg">Campo obrigatório</span>
              )}
            </div>

            <div className="input-group">
              <label>Fruta</label>
              <input
                type="text"
                name="fruta"
                value={formData.fruta}
                onChange={handleChange}
                placeholder="Ex: Melancia"
              />
            </div>

            <div className="input-group">
              <label>Sobremesa</label>
              <input
                type="text"
                name="sobremesa"
                value={formData.sobremesa}
                onChange={handleChange}
                placeholder="Ex: Doce de Banana"
              />
            </div>

            <div className={`input-group ${errors.bebida ? "error" : ""}`}>
              <label>
                Bebida <span className="required">*</span>
              </label>
              <input
                type="text"
                name="bebida"
                value={formData.bebida}
                onChange={handleChange}
                placeholder="Ex: Suco de Goiaba"
              />
              {errors.bebida && (
                <span className="error-msg">Campo obrigatório</span>
              )}
            </div>

            <div className="input-group">
              <label>Observação</label>
              <input
                type="text"
                name="obs"
                value={formData.obs}
                onChange={handleChange}
                placeholder="Ex: Alérgicos, contém glúten"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={() => navigate("/cardapio")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {cardapioParaEditar ? "Atualizar" : "Salvar"}
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
                  ? navigate("/cardapio")
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
