import React, { PropsWithChildren } from 'react';

import { ActivityIndicator, ViewStyle } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { theme } from '@/global/theme';
import { ButtonText, Container } from './styles';

interface Props<T extends string = ''> {
  onPress?: () => void;
  style?: ViewStyle;
  href?: Href<T>;
  isOutline?: boolean;
  isLoading?: boolean;
}

/**
 * Componente de Botão padrão
 * @param onPress Função a ser executada ao clicar no botão
 * @param children Conteúdo do botão
 * @param href Caso passe href voce pode usar o botão como um link de redirecionamento
 */
export const Button = ({
  onPress,
  children,
  style,
  href,
  isOutline,
  isLoading,
}: PropsWithChildren<Props>) => {
  const router = useRouter();
  const handlePress = () => {
    if (onPress) {
      return onPress();
    }
    if (href) {
      return router.push(href);
    }
  };

  return (
    <Container
      onPress={handlePress}
      style={style}
      isOutline={isOutline}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator
          color={isOutline ? theme.colors.primary_01 : theme.colors.white}
        />
      ) : (
        <ButtonText isOutline={isOutline}>{children}</ButtonText>
      )}
    </Container>
  );
};
