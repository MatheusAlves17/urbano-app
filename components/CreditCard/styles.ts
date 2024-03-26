import styled from 'styled-components/native';

export const Card = styled.View`
  width: 100%;
  height: 150px;

  padding: 16px;

  margin: 8px 0;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const IconWrapper = styled.View`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.white_02};
`;

export const CardNumber = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_500};
  color: ${({ theme }) => theme.colors.neutro_01};
  width: 70%;
`;

export const HideNumber = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0 2px;
`;

export const MaskNumber = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.neutro_01};
`;
