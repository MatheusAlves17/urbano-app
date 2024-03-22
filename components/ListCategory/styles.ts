import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Row = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CategoryItem = styled.TouchableOpacity`
  width: 70px;

  align-items: center;
  justify-content: center;
`;

export const CategoryImage = styled(Image)`
  width: 60px;
  height: 60px;
  border-radius: 32px;

  margin-bottom: 8px;
`;
