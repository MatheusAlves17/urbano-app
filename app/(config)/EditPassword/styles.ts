import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 16px;
`;

export const Label = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primary_02};
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};

  margin-bottom: 12px;
`;

export const InputContainer = styled.View`
  width: 100%;
  min-height: 50px;

  padding: 0px 8px;

  flex-direction: row;
  align-items: center;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.primary_02};
  background-color: ${({ theme }) => theme.colors.background};
`;

export const TextInput = styled.Text`
  width: 85%;
  padding-left: 4%;

  font-size: 16px;
  color: ${({ theme }) => `${theme.colors.primary_02}80`};
  font-family: ${({ theme }) => theme.fonts.Urbanist_400};
`;

export const Row = styled.TouchableOpacity`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary_02};
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};

  margin: 16px 0;
`;

export const ErrorMessage = styled.Text`
  font-size: 9px;

  color: ${({ theme }) => theme.colors.neutro_01};

  padding-top: 0.5%;
  padding-left: 3%;
`;
