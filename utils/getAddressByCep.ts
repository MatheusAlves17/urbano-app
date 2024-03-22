import axios from 'axios';

export interface IAddress {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export const getAddressByCep = async (
  cep: string,
): Promise<IAddress | null> => {
  try {
    const normalizedZip = cep.replace(/\D/g, '');
    const { data } = await axios.get(
      `https://viacep.com.br/ws/${normalizedZip}/json/`,
    );
    return data;
  } catch (error) {
    console.log('Não foi possível localizar o cep');
    return null;
  }
};
