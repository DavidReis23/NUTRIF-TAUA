import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Importação dos Schemas
import { loginSchema, forgotSchema, resetSchema } from "../../schemas/authSchema";

import "./Login.css";

// Importações de Imagens
import logoImage from "../../assets/logo.png";
import redElement from "../../assets/red_element.png";
import greenElement from "../../assets/green_element.png";
import fruitBackground from "../../assets/fruit_background.png";

export default function Login() {
  const navigate = useNavigate();
  const [view, setView] = useState("login");

  // Estados de UI (Visibilidade de Senhas)
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // --- FORMULÁRIO DE LOGIN ---
  const {
    register: regLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  // --- FORMULÁRIO ESQUECI A SENHA ---
  const {
    register: regForgot,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
  } = useForm({ resolver: zodResolver(forgotSchema) });

<<<<<<< HEAD
    if (Object.keys(erros).length > 0) {
      setLoginErrors(erros);
    } else {
      localStorage.setItem("usuario_logado", "true");
      navigate("/home");
    }
=======
  // --- FORMULÁRIO RESET DE SENHA ---
  const {
    register: regReset,
    handleSubmit: handleResetSubmit,
    watch,
    formState: { errors: resetErrors },
  } = useForm({ resolver: zodResolver(resetSchema) });

  // Monitoramento da nova senha para as regras visuais (Checklist)
  const novaSenhaValue = watch("novaSenha", "");
  const tem8Char = novaSenhaValue.length >= 8;
  const temNumero = /\d/.test(novaSenhaValue);
  const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(novaSenhaValue);

  // Handlers de Submissão
  const onLogin = (data) => {
    console.log("Login enviado:", data);
    localStorage.setItem("usuario_logado", "true");
    navigate("/");
>>>>>>> 7ef1f2eb9b15fa7ef8f70b09f43852dd9e34bac8
  };

  const onForgot = (data) => {
    console.log("Email para recuperação:", data);
    setView("forgot-success");
  };

  const onReset = (data) => {
    console.log("Senha resetada com sucesso:", data);
    setView("login");
  };

  const renderRightSideContent = () => {
    switch (view) {
      case "login":
        return (
          <div className="content-section-standard">
            <div className="login-header">
              <h1>NUTRIF-TAUÁ</h1>
              <p>Boas Vindas!</p>
            </div>
            <form className="login-form" onSubmit={handleLoginSubmit(onLogin)}>
              <div className="form-group">
                <label className={loginErrors.email ? "error-label" : ""}>Email</label>
                <div className="input-wrapper">
                  <input
                    {...regLogin("email")}
                    type="text"
                    placeholder="Digite seu email Institucional"
                    className={loginErrors.email ? "error-input" : ""}
                  />
                </div>
                {loginErrors.email && <span className="error-msg">{loginErrors.email.message}</span>}
              </div>

              <div className="form-group">
                <label className={loginErrors.senha ? "error-label" : ""}>Senha</label>
                <div className="input-wrapper">
                  <input
                    {...regLogin("senha")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className={loginErrors.senha ? "error-input" : ""}
                  />
                  <i
                    className={`ph-bold ${showPassword ? "ph-eye-slash" : "ph-eye"} eye-icon`}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
                {loginErrors.senha && <span className="error-msg">{loginErrors.senha.message}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-group">
                  <input type="checkbox" /> Lembre de mim
                </label>
                <span className="link-esqueceu" onClick={() => setView("forgot")}>
                  Esqueceu a senha?
                </span>
              </div>
              <button type="submit" className="btn-submit">Entrar</button>
            </form>
          </div>
        );

      case "forgot":
        return (
          <div className="content-section-standard">
            <div className="alert-center-screen">
              <i className="ph-bold ph-envelope-simple icon-central"></i>
              <h2>Esqueceu a senha?</h2>
              <p>Insira seu email para receber um link de redefinição.</p>
              <form className="login-form" onSubmit={handleForgotSubmit(onForgot)}>
                <div className="form-group">
                  <div className="input-wrapper">
                    <i className="ph-bold ph-envelope-simple" style={{ position: "absolute", left: "15px", color: forgotErrors.forgotEmail ? "#ef4444" : "#cbd5e1" }}></i>
                    <input
                      {...regForgot("forgotEmail")}
                      type="text"
                      placeholder="example@gmail.com"
                      style={{ paddingLeft: "45px" }}
                      className={forgotErrors.forgotEmail ? "error-input" : ""}
                    />
                  </div>
                  {forgotErrors.forgotEmail && <span className="error-msg">{forgotErrors.forgotEmail.message}</span>}
                </div>
                <button type="submit" className="btn-submit blue">Enviar Link</button>
                <p className="mt-4 text-center text-xs text-slate-500">
                  Lembrou da senha? <span className="link-esqueceu" onClick={() => setView("login")}>Faça Login!</span>
                </p>
              </form>
            </div>
          </div>
        );

      case "forgot-success":
        return (
          <div className="content-section-standard">
            <div className="alert-center-screen">
              <i className="ph-bold ph-check-circle icon-central" style={{ color: "#22c55e" }}></i>
              <p>Se o email estiver cadastrado, você receberá as instruções em instantes.</p>
              <button className="btn-submit blue mt-4" onClick={() => setView("login")}>Voltar ao Login</button>
            </div>
          </div>
        );

      case "reset":
        return (
          <div className="content-section-standard">
            <div className="alert-center-screen">
              <i className="ph-light ph-key icon-central"></i>
              <h2>Redefina sua senha</h2>
              <form className="login-form" onSubmit={handleResetSubmit(onReset)}>
                <div className="form-group">
                  <label className={resetErrors.novaSenha ? "error-label" : ""}>Nova senha *</label>
                  <div className="input-wrapper">
                    <input
                      {...regReset("novaSenha")}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="********"
                      className={resetErrors.novaSenha ? "error-input" : ""}
                    />
                    <i className={`ph-bold ${showNewPassword ? "ph-eye-slash" : "ph-eye"} eye-icon`} onClick={() => setShowNewPassword(!showNewPassword)}></i>
                  </div>
                </div>

                <div className="form-group">
                  <label className={resetErrors.confirmaSenha ? "error-label" : ""}>Confirme sua senha *</label>
                  <div className="input-wrapper">
                    <input
                      {...regReset("confirmaSenha")}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="********"
                      className={resetErrors.confirmaSenha ? "error-input" : ""}
                    />
                    <i className={`ph-bold ${showConfirmPassword ? "ph-eye-slash" : "ph-eye"} eye-icon`} onClick={() => setShowConfirmPassword(!showConfirmPassword)}></i>
                  </div>
                  {resetErrors.confirmaSenha && <span className="error-msg">{resetErrors.confirmaSenha.message}</span>}
                </div>

                <ul className="password-rules">
                  <li className={`rule-item ${tem8Char ? "valid" : "invalid"}`}>
                    <i className={`ph-bold ${tem8Char ? "ph-check" : "ph-x"}`}></i> Mínimo 8 caracteres
                  </li>
                  <li className={`rule-item ${temNumero ? "valid" : "invalid"}`}>
                    <i className={`ph-bold ${temNumero ? "ph-check" : "ph-x"}`}></i> Pelo menos 1 número
                  </li>
                  <li className={`rule-item ${temEspecial ? "valid" : "invalid"}`}>
                    <i className={`ph-bold ${temEspecial ? "ph-check" : "ph-x"}`}></i> Pelo menos 1 especial
                  </li>
                </ul>
                <button type="submit" className="btn-submit blue">Concluir</button>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-main-card">
        <div className="login-left-side">
          <img src={fruitBackground} alt="Fundo" className="bg-frutas" />
          <img src={greenElement} alt="Detalhe Verde" className="decor-green-icon" />
          <img src={logoImage} alt="Ilustração" className="illustration-main" />
        </div>

        <div className="login-right-side">
          <img src={redElement} alt="Detalhe Vermelho" className="decor-red-top" />
          {view !== "login" && (
            <button type="button" className="btn-voltar-login" onClick={() => setView("login")}>
              <i className="ph-bold ph-caret-left"></i> Voltar
            </button>
          )}
          {renderRightSideContent()}
        </div>
      </div>
    </div>
  );
}