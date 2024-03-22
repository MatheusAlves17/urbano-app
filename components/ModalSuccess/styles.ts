import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(156, 158, 161, 1);
  padding-left: 20px;
  padding-right: 20px;
`;

export const Content = styled.View`
  width: 100%;
  min-height: 250px;

  align-items: center;
  /* justify-content: center; */

  background: ${({ theme }) => theme.colors.background};

  border-radius: 32px;
  padding: 30px;
`;

export const IconWrapper = styled.View`
  width: 80px;
  height: 80px;

  align-self: center;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};
  color: ${({ theme }) => theme.colors.success};

  margin-top: 10px;

  text-align: center;
  /* text-transform: uppercase; */
`;

export const Description = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_400};
  color: ${({ theme }) => theme.colors.neutro_01};

  text-align: center;
  /* text-transform: uppercase; */
`;
