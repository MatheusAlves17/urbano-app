import * as Yup from 'yup';

import { validateCPF } from './yup';

export type SignupForm = Yup.InferType<typeof SignupSchema>;

export const SignupSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  birth: Yup.string().required('Data de nascimento é obrigatória'),
  cpf: Yup.string().required('CPF é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email pbrigatório'),
  password: Yup.string()
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
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Senhas não conferem')
    .required('Confirmação de senha obrigatória'),
});
