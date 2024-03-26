import * as Yup from 'yup';

export type AddressForm = Yup.InferType<typeof AddressSchema>;

export const AddressSchema = Yup.object({
  zipCode: Yup.string().required('CEP é obrigatório'),
  street: Yup.string().required('Rua é obrigatória'),
  number: Yup.string().required('Número é obrigatório'),
  district: Yup.string().required('Bairro é obrigatório'),
  city: Yup.string().required('Cidade é obrigatória'),
  state: Yup.string().required('Estado é obrigatório'),
  type: Yup.string().required('Tipo de endereço é obrigatório'),
});
