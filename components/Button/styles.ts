import styled from 'styled-components/native';

interface IButtonProps {
  isOutline?: boolean;
}

export const Container = styled.TouchableOpacity<IButtonProps>`
  width: 100%;
  min-height: 56px;
  margin-bottom: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-radius: 16px;
  background-color: ${({ theme, isOutline }) =>
    !isOutline ? theme.colors.primary_01 : theme.colors.background};
  border: 1px solid
    ${({ theme, isOutline }) =>
      isOutline ? theme.colors.primary_01 : theme.colors.background};
`;

export const ButtonText = styled.Text<IButtonProps>`
  font-size: 16px;
  color: ${({ theme, isOutline }) =>
    isOutline ? theme.colors.primary_01 : theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};
`;
