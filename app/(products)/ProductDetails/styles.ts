import { width } from '@/global/constants';
import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const ImageContainer = styled.View`
  width: ${width}px;
  height: 400px;

  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.white_02};
`;

export const ImageProduct = styled(Image)`
  width: 180px;
  height: 200px;
`;

export const Content = styled.View`
  width: 100%;
  margin-top: auto;
`;

export const Category = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_300};
  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;
`;

export const Title = styled.Text`
  width: 70%;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_600};

  color: ${({ theme }) => theme.colors.neutro_01};

  text-align: justify;
`;

export const Price = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};

  color: ${({ theme }) => theme.colors.neutro_01};
`;
