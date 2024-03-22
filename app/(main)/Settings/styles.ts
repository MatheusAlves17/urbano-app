import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 16px;
`;

export const Card = styled.Pressable`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const IconWrapper = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 8px;

  margin-right: 16px;

  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const MenuTitle = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_600};

  color: ${({ theme }) => theme.colors.neutro_01};
`;
