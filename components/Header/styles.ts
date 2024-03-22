import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 50px;

  margin-top: 16px;

  flex-direction: row;
  align-items: center;
`;

export const ButtonBack = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  justify-content: center;

  left: 0;
  position: absolute;

  border-radius: 32px;
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;

export const TitleWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_500};

  color: ${({ theme }) => theme.colors.neutro_01};
`;
