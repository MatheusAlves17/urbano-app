import * as Yup from 'yup';

export type CreditCardForm = Yup.InferType<typeof CreditCardSchema>;

export const CreditCardSchema = Yup.object({
  number: Yup.string().required('Número do cartão é obrigatório'),
  validity: Yup.string().required('Validade é obrigatória'),
  cvv: Yup.string().required('CVV é obrigatório'),
  name: Yup.string().required('Nome do titular é obrigatório'),
});
