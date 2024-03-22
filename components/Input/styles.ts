import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';

// Estilização do container da input
export const InputContainer = styled.View`
  width: 100%;
  min-height: 50px;

  padding: 0 8px;

  flex-direction: row;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary_02};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ErrorMessage = styled.Text`
  font-size: 9px;

  color: ${({ theme }) => theme.colors.error};

  padding-top: 0.5%;
  padding-left: 3%;
`;

// Estilização do texto da input
export const TextInput = styled.TextInput`
  width: 85%;
  padding-left: 4%;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary_02};
  font-family: ${({ theme }) => theme.fonts.Urbanist_400};
`;

export const TextInputMasked = styled(TextInputMask)`
  width: 85%;
  padding-left: 4%;

  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary_02};
  font-family: ${({ theme }) => theme.fonts.Urbanist_400};
`;

export const Label = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary_02};
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};

  margin-bottom: 12px;
`;
