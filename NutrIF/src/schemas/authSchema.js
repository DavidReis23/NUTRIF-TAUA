import { z } from "zod";

// Função auxiliar para validar o domínio IFCE
const emailIFCE = (val) => 
  val.endsWith("@ifce.edu.br") || val.endsWith("@aluno.ifce.edu.br");

const msgErroEmail = "Use um e-mail institucional (@ifce.edu.br ou @aluno.ifce.edu.br)";

// 1. Schema de Login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .refine(emailIFCE, { message: msgErroEmail }),
  senha: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// 2. Schema de Esqueci a Senha
export const forgotSchema = z.object({
  forgotEmail: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("Formato de e-mail inválido")
    .refine(emailIFCE, { message: msgErroEmail }),
});

// 3. Schema de Redefinição (Reset)
export const resetSchema = z
  .object({
    novaSenha: z
      .string()
      .min(8, "Mínimo 8 caracteres")
      .regex(/\d/, "Deve conter pelo menos 1 número")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Deve conter pelo menos 1 caractere especial"),
    confirmaSenha: z.string().min(1, "Confirmação obrigatória"),
  })
  .refine((data) => data.novaSenha === data.confirmaSenha, {
    message: "As senhas não coincidem",
    path: ["confirmaSenha"],
  });