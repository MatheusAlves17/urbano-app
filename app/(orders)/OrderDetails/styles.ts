import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;

  margin-top: 16px;
`;

export const Card = styled.TouchableOpacity<{ isSelected?: boolean }>`
  width: 100%;

  flex-direction: row;
  justify-content: space-around;

  margin: 8px 0;
  padding: 12px;

  border-radius: 16px;
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.primary_01 : theme.colors.white};
  background-color: ${({ theme }) => theme.colors.white};
`;

export const CardName = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_400};

  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const CardPrice = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_500};

  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const ImageItems = styled(Image)`
  width: 40px;
  height: 40px;

  border-radius: 32px;
`;
