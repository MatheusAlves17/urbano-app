import styled from 'styled-components/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { width } from './constants';

interface TextProps {
  align?: 'flex-start' | 'center' | 'flex-end';
}

export const GlobalContainer = styled.SafeAreaView`
  flex: 1;

  align-items: center;

  padding: 0 ${width * 0.07}px;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const GlobalScrollView = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;

  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const GlobalKeyboardAware = styled(KeyboardAwareScrollView).attrs({
  showsVerticalScrollIndicator: false,
})`
  width: 100%;
  height: 100%;
`;

export const GlobalRow = styled.View`
  flex-direction: row;
  width: ${width * 0.9}px;

  align-items: center;
  justify-content: space-between;
`;

export const GlobalTitle = styled.Text<TextProps>`
  align-self: ${({ align }) => align || 'flex-start'};

  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_700};
  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const GlobalSubtitle = styled.Text<TextProps>`
  align-self: ${({ align }) => align || 'flex-start'};

  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_600};
  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const GlobalLink = styled.Text<TextProps>`
  align-self: ${({ align }) => align || 'flex-start'};

  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_600};
  color: ${({ theme }) => theme.colors.neutro_01};
`;

export const GlobalText = styled.Text<TextProps>`
  align-self: ${({ align }) => align || 'center'};
  text-align: justify;
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.Urbanist_400};
  color: ${({ theme }) => theme.colors.neutro_01};
`;
