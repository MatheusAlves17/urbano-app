import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Content = styled.View`
  margin: 24px 0;
`;
export const ItemsContainer = styled.View`
  flex-flow: row wrap;
  align-items: center;
  justify-content: space-around;

  margin-top: 16px;
  margin-bottom: 120px;
`;

export const Row = styled.View`
  margin-top: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 48%;
  height: 200px;

  margin: 4px 0;
  padding: 8px;
  border-radius: 12px;

  background-color: ${({ theme }) => theme.colors.white_02};
`;

export const CardImage = styled(Image)`
  width: 100%;
  height: 80%;
`;
