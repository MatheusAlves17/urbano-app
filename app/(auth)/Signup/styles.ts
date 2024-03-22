import styled from 'styled-components/native';

export const Content = styled.View`
  flex: 1;
  padding: 0 25px;
`;

export const Header = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
  margin-bottom: 36px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary_02};
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};
`;
