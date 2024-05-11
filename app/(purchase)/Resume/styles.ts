import styled from 'styled-components/native';

export const Content = styled.View`
  width: 100%;
  margin: 20px 0 60px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Row = styled.View`
  flex-direction: row;
  width: 100%;

  align-items: center;
  justify-content: space-between;
`;

export const ContentTitle = styled.Text`
  font-size: 16px;

  /* margin: 16px 0px; */

  font-family: ${({ theme }) => theme.fonts.Urbanist_300};
  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const Span = styled.Text`
  font-size: 14px;

  font-family: ${({ theme }) => theme.fonts.Urbanist_500};
  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;

  margin: 10px 0;

  background-color: ${({ theme }) => theme.colors.white_02};
`;
