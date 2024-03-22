import styled from 'styled-components/native';

export const Content = styled.View`
  flex: 1;
  padding: 0 25px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primary_02};
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};
`;

export const TextLink = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_400};

  align-self: flex-end;

  margin: 24px 0 56px;

  color: ${({ theme }) => theme.colors.primary_01};
`;
