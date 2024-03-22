import * as Yup from 'yup';

export type ProfileForm = Yup.InferType<typeof ProfileSchema>;

export const ProfileSchema = Yup.object({
  name: Yup.string().required('Nome é obrigatório'),
  cpf: Yup.string().required('CPF é obrigatório'),
  phone: Yup.string().required('Telefone é obrigatório'),
  email: Yup.string().email('E-mail inválido').required('E-mail obrigatório'),
});
