import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

// Importações de Imagens (Isso garante que elas vão aparecer!)
import logoImage from "../../assets/logo.png";
import redElement from "../../assets/red_element.png";
import greenElement from "../../assets/green_element.png";
import fruitBackground from "../../assets/fruit_background.png"; // O fundo de frutinhas!

export default function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({});
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [resetErrors, setResetErrors] = useState(null);

  // Novos estados para controlar a tela de Esqueci a Senha
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const erros = {};
    if (!email) erros.email = "Campo Obrigatório";
    else if (!email.includes("@")) erros.email = "Formato de email inválido";
    if (!senha) erros.senha = "Campo Obrigatório";

    if (Object.keys(erros).length > 0) {
      setLoginErrors(erros);
    } else {
      localStorage.setItem("usuario_logado", "true");
      navigate("/");
    }
  };

  // Nova função para validar o botão "Enviar Link" sem usar o balão do Chrome
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setForgotError("Insira um email válido!");
    } else if (!forgotEmail.includes("@")) {
      setForgotError("Formato de email inválido!");
    } else {
      setForgotError(""); // Limpa o erro
      setView("forgot-success"); // Vai pra tela de sucesso
    }
  };

  // O conteúdo central (formulário, ícones, textos de erro)
  const renderRightSideContent = () => {
    switch (view) {
      case "login":
        return (
          <div className="content-section-standard">
            <div className="login-header">
              <h1>NUTRIF-TAUÁ</h1>
              <p>Boas Vindas!</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label
                  className={
                    loginErrors.email || loginErrors.ambos ? "error-label" : ""
                  }
                >
                  Email
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    placeholder="Digite seu email Institucional"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setLoginErrors({ ...loginErrors, email: "", ambos: "" });
                    }}
                    className={
                      loginErrors.email || loginErrors.ambos
                        ? "error-input"
                        : ""
                    }
                  />
                </div>
                {loginErrors.email && (
                  <span className="error-msg">{loginErrors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label
                  className={
                    loginErrors.senha || loginErrors.ambos ? "error-label" : ""
                  }
                >
                  Senha
                </label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value);
                      setLoginErrors({ ...loginErrors, senha: "", ambos: "" });
                    }}
                    className={
                      loginErrors.senha || loginErrors.ambos
                        ? "error-input"
                        : ""
                    }
                  />
                  <i
                    className={`ph-bold ${showPassword ? "ph-eye-slash" : "ph-eye"} eye-icon`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
                {loginErrors.senha && (
                  <span className="error-msg">{loginErrors.senha}</span>
                )}
                {loginErrors.ambos && (
                  <span
                    className="error-msg"
                    style={{ marginTop: "5px", textAlign: "center" }}
                  >
                    {loginErrors.ambos}
                  </span>
                )}
              </div>

              <div className="form-options">
                <label className="checkbox-group">
                  <input type="checkbox" /> Lembre de mim
                </label>
                <span
                  className="link-esqueceu"
                  onClick={() => {
                    setView("forgot");
                    setForgotError(""); // Limpa erro ao entrar na tela
                    setForgotEmail(""); // Limpa o campo ao entrar na tela
                  }}
                >
                  Esqueceu a senha?
                </span>
              </div>

              <button type="submit" className="btn-submit">
                Entrar
              </button>
            </form>
          </div>
        );

      case "error-blocked":
        return (
          <div className="content-section-standard">
            <div className="alert-center-screen">
              <i className="ph-light ph-warning icon-central red"></i>
              <h2>
                Conta temporariamente
                <br />
                bloqueada
              </h2>
              <p>Tente novamente em 15 segundos</p>
            </div>
          </div>
        );

      case "error-inactive":
        return (
          <div className="content-section-standard">
            <div className="alert-center-screen">
              <i className="ph-light ph-warning icon-central red"></i>
              <h2>Sua conta está inativa!</h2>
              <p>A conta precisa ser ativada por um administrador.</p>
              <p style={{ fontSize: "0.8rem" }}>
                Email:{" "}
                <a href="mailto:suporte.refeitorio@ifce.edu.br">
                  suporte.refeitorio@ifce.edu.br
                </a>
              </p>
            </div>
          </div>
        );

      case "forgot":
        return (
          <div className="content-section-standard">
            <div className="alert-center-screen">
              <i className="ph-bold ph-envelope-simple icon-central"></i>
              <h2 style={{ margin: "0 0 5px 0" }}>Esqueceu a senha?</h2>
              <p style={{ marginBottom: "40px", fontSize: "0.85rem" }}>
                Insira seu email para receber um link
                <br />
                para redefinir a senha.
              </p>

              {/* O formulário agora chama a nossa função personalizada */}
              <form className="login-form" onSubmit={handleForgotSubmit}>
                <div className="form-group">
                  <label className={forgotError ? "error-label" : ""}>
                    Email
                  </label>
                  <div className="input-wrapper">
                    <i
                      className="ph-bold ph-envelope-simple"
                      style={{
                        position: "absolute",
                        left: "15px",
                        color: forgotError ? "#ef4444" : "#cbd5e1", // Ícone fica vermelho também!
                      }}
                    ></i>
                    {/* Removido o 'required' para usar a nossa validação React */}
                    <input
                      type="text"
                      placeholder="example@gmail.com"
                      value={forgotEmail}
                      onChange={(e) => {
                        setForgotEmail(e.target.value);
                        setForgotError(""); // Some o erro quando o usuário digita
                      }}
                      style={{ paddingLeft: "45px" }}
                      className={forgotError ? "error-input" : ""}
                    />
                  </div>
                  {/* Mensagem de erro vermelha em baixo do input */}
                  {forgotError && (
                    <span className="error-msg">{forgotError}</span>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn-submit blue"
                  style={{ marginTop: "10px" }}
                >
                  Enviar Link
                </button>
                <p
                  style={{
                    textAlign: "center",
                    marginTop: "15px",
                    fontSize: "0.75rem",
                    color: "#64748b",
                  }}
                >
                  Lembrou da senha?{" "}
                  <span
                    className="link-esqueceu"
                    onClick={() => setView("login")}
                  >
                    Faça Login!
                  </span>
                </p>
              </form>
            </div>
          </div>
        );

      case "forgot-success":
        return (
          <div className="content-section-standard">
            <div className="alert-center-screen">
              <i
                className="ph-bold ph-check-circle icon-central"
                style={{ color: "#22c55e" }}
              ></i>
              <p style={{ fontWeight: "600", color: "#333" }}>
                Se o email estiver cadastrado, enviaremos
                <br />
                instruções para redefinir a sua senha.
              </p>
            </div>
          </div>
        );

      case "reset":
        { const tem8Char = novaSenha.length >= 8;
        const temNumero = /\d/.test(novaSenha);
        const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(novaSenha);

        return (
          <div className="content-section-standard">
            <div className="alert-center-screen">
              <i className="ph-light ph-key icon-central"></i>
              <h2 style={{ margin: "0 0 5px 0" }}>Redefina sua senha</h2>
              <p style={{ marginBottom: "30px", fontSize: "0.8rem" }}>
                Defina sua nova senha de acesso.
              </p>
              <form
                className="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  setResetErrors(
                    "A nova senha deverá ser diferente da anterior.",
                  );
                }}
              >
                <div className="form-group">
                  <label className={resetErrors ? "error-label" : ""}>
                    Nova senha <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <div className="input-wrapper">
                    <i
                      className="ph-bold ph-lock-key"
                      style={{
                        position: "absolute",
                        left: "15px",
                        color: "#cbd5e1",
                      }}
                    ></i>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="********"
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      style={{ paddingLeft: "45px" }}
                      className={resetErrors ? "error-input" : ""}
                    />
                    <i
                      className={`ph-bold ${showNewPassword ? "ph-eye-slash" : "ph-eye"} eye-icon`}
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    ></i>
                  </div>
                </div>

                <div className="form-group">
                  <label className={resetErrors ? "error-label" : ""}>
                    Confirme sua nova senha{" "}
                    <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <div className="input-wrapper">
                    <i
                      className="ph-bold ph-lock-key"
                      style={{
                        position: "absolute",
                        left: "15px",
                        color: "#cbd5e1",
                      }}
                    ></i>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      value={confirmaSenha}
                      onChange={(e) => setConfirmaSenha(e.target.value)}
                      style={{ paddingLeft: "45px" }}
                      className={resetErrors ? "error-input" : ""}
                    />
                    <i
                      className={`ph-bold ${showConfirmPassword ? "ph-eye-slash" : "ph-eye"} eye-icon`}
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    ></i>
                  </div>
                  {resetErrors && (
                    <span className="error-msg">{resetErrors}</span>
                  )}
                </div>

                {!resetErrors && (
                  <ul className="password-rules">
                    <li
                      className={`rule-item ${tem8Char ? "valid" : "invalid"}`}
                    >
                      <i
                        className={`ph-bold ${tem8Char ? "ph-check" : "ph-x"}`}
                      ></i>{" "}
                      Mínimo 8 caracteres
                    </li>
                    <li
                      className={`rule-item ${temNumero ? "valid" : "invalid"}`}
                    >
                      <i
                        className={`ph-bold ${temNumero ? "ph-check" : "ph-x"}`}
                      ></i>{" "}
                      Contém pelo menos 1 número
                    </li>
                    <li
                      className={`rule-item ${temEspecial ? "valid" : "invalid"}`}
                    >
                      <i
                        className={`ph-bold ${temEspecial ? "ph-check" : "ph-x"}`}
                      ></i>{" "}
                      Contém pelo menos 1 caractere especial
                    </li>
                  </ul>
                )}

                <button
                  type="submit"
                  className="btn-submit blue"
                  style={{ marginTop: "10px" }}
                >
                  Concluir
                </button>
              </form>
            </div>
          </div>
        ); }

      default:
        return null;
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-main-card">
        {/* =========================================
            LADO ESQUERDO: Fundo de Frutas + Ilustração Maior 
            ========================================= */}
        <div className="login-left-side">
          {/* O fundo de frutinhas colocado diretamente na tela (agora é garantido) */}
          <img src={fruitBackground} alt="Fundo" className="bg-frutas" />

          {/* Aquele detalhe verde no canto */}
          <img
            src={greenElement}
            alt="Detalhe Verde"
            className="decor-green-icon"
          />

          {/* O cara do celular gigante */}
          <img src={logoImage} alt="Ilustração" className="illustration-main" />
        </div>

        {/* =========================================
            LADO DIREITO: Botão Fixo + Onda Maior 
            ========================================= */}
        <div className="login-right-side">
          <img
            src={redElement}
            alt="Detalhe Vermelho"
            className="decor-red-top"
          />

          {/* O botão VOLTAR está aqui fora do conteúdo. Ficará fixo no topo esquerdo! */}
          {view !== "login" && (
            <button
              type="button"
              className="btn-voltar-login"
              onClick={() => setView("login")}
            >
              <i className="ph-bold ph-caret-left"></i> Voltar
            </button>
          )}

          {/* Só carrega o formulário do meio */}
          {renderRightSideContent()}
        </div>
      </div>
    </div>
  );
}
