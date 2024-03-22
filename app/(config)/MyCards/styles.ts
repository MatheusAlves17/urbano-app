import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 16px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
