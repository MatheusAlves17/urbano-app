import { Image } from 'expo-image';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 16px;
`;

export const Card = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 100%;
  min-height: 120px;

  padding: 16px;

  margin: 8px 0;

  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const ImageItems = styled(Image)`
  width: 40px;
  height: 40px;

  border-radius: 32px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;

  margin: 4px 0;
`;

export const StatusOrder = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_300};

  color: ${({ theme }) => theme.colors.neutro_01};
`;

interface IStatusProps {
  status?: string;
}

export const StatusIndicator = styled.View<IStatusProps>`
  width: 10px;
  border: 10px;

  background-color: ${({ status, theme }) => status || theme.colors.white};
  margin-right: 10px;

  border-radius: 16px;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${({ theme }) => theme.colors.white_02};
`;
