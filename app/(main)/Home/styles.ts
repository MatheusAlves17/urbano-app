import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Header = styled.View`
  width: 100%;
  padding: 16px 0;
  margin-top: 16px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const AddressContainer = styled.View``;

export const AddressLabel = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_300};

  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const Row = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;
`;

export const AddressText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};

  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const NotificationButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  width: 40px;
  height: 40px;

  align-items: center;
  justify-content: center;

  border-radius: 32px;
  background-color: ${({ theme }) => theme.colors.white_02};
`;

export const Content = styled.View`
  width: 100%;
`;

export const Highlight = styled.View`
  width: 100%;
  height: 162px;

  margin: 24px 0 32px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 16px;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white_02};
`;

export const HightlightImage = styled(Image)`
  height: 100%;
  width: 50%;
`;

export const HighlightTitle = styled.Text`
  width: 50%;
  text-align: left;

  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_600};

  margin-top: 16px;

  color: ${({ theme }) => theme.colors.neutro_01};
`;
