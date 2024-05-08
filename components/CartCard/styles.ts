import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const CardContainer = styled.View`
  width: 100%;
  height: 100px;

  margin: 8px 0px;
  padding: 0px 24px;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ImageContainer = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white_02};

  margin-right: 32px;
`;

export const ProductImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 16px;
`;

export const CardTitle = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_500};

  width: 70%;

  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const CardPrice = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_500};

  width: 70%;

  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const CardQuantity = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_400};

  padding: 0 6px;

  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const ActionsRow = styled.View`
  width: 15%;

  align-items: center;
  justify-content: center;
  flex-direction: row;
`;
