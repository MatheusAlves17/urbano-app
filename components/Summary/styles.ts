import { width } from '@/global/constants';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: ${width}px;
  height: 450px;
  padding: 16px ${width * 0.07}px;

  /* position: absolute;
  bottom: 0; */

  background-color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.Text`
  font-size: 16px;

  font-family: ${({ theme }) => theme.fonts.Urbanist_600};
  color: ${({ theme }) => theme.colors.neutro_01};

  margin-top: 16px;
`;

export const Row = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 8px 0;
`;

export const IconWrapper = styled.View`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;
  margin-right: 10px;

  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.white_02};
`;

export const Subtitle = styled.Text`
  font-size: 14px;

  font-family: ${({ theme }) => theme.fonts.Urbanist_500};
  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const Span = styled.Text`
  font-size: 14px;

  font-family: ${({ theme }) => theme.fonts.Urbanist_300};
  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.white_02};
`;
