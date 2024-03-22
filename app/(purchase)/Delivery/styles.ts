import styled from 'styled-components/native';

interface ICardProps {
  isSelected?: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
`;

export const Card = styled.TouchableOpacity<ICardProps>`
  width: 100%;
  height: 100px;

  flex-direction: row;
  align-items: center;

  padding: 16px;

  margin: 8px 0;

  border-radius: 16px;
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary_01 : theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const IconWrapper = styled.View<ICardProps>`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;
  margin-right: 16px;

  border-radius: 32px;
  background-color: ${({ theme, isSelected }) =>
    isSelected ? `${theme.colors.success}10` : theme.colors.white_02};
`;

export const AddressText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_500};
  color: ${({ theme }) => theme.colors.neutro_01};
  width: 70%;
`;
