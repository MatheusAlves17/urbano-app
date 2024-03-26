import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 16px;
`;

export const Card = styled.TouchableOpacity`
  width: 100%;
  height: 110px;

  padding: 16px;

  margin: 8px 0;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const EditButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.white_02};
`;

export const IconWrapper = styled.View`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;
  margin-right: 16px;

  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.white_02};
`;

export const AddressText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_500};
  color: ${({ theme }) => theme.colors.neutro_01};
  width: 70%;
`;
