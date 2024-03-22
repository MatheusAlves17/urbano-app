import * as Yup from 'yup';

export type ProfileForm = Yup.InferType<typeof ProfileSchema>;

export const ProfileSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
});

export type PasswordForm = Yup.InferType<typeof PasswordSchema>;
export const PasswordSchema = Yup.object({
  currentPassword: Yup.string().required('Senha antiga é obrigatória'),
  newPassword: Yup.string()
    .required('Senha deve ser obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .max(12, 'A senha deve ter no máximo 12 caracteres')
    .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/\d/, 'A senha deve conter pelo menos um número')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'A senha deve conter pelo menos um caractere especial',
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Senhas não conferem')
    .required('Confirmação de senha obrigatória'),
});
