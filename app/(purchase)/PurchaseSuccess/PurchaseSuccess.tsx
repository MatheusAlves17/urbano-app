import {
  GlobalContainer,
  GlobalSubtitle,
  GlobalText,
  GlobalTitle,
} from '@/global/styles';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Success } from '@/assets/icons';
import { theme } from '@/global/theme';
import { Button } from '@/components/Button/Button';
import { router } from 'expo-router';
import { Container } from './styles';

const PurchaseSuccess = () => {
  const messageScale = useSharedValue(1);

  const opacity = useSharedValue(0);

  const fadeIn = () => {
    opacity.value = withTiming(1, { duration: 2000 });
  };

  const messageAnimatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: messageScale.value }],
  }));

  const messageAnimation = () => {
    messageScale.value = withSequence(
      withTiming(0.2),
      withTiming(2),
      withTiming(1.5),
    );
    fadeIn();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useEffect(() => {
    messageAnimation();
  }, []);

  return (
    <GlobalContainer>
      <Container>
        <Animated.View style={[styles.message, messageAnimatedStyles]}>
          <Success />
          <GlobalTitle style={styles.title} align="center">
            Sucesso!
          </GlobalTitle>
        </Animated.View>
        <Animated.View style={animatedStyle}>
          <GlobalText style={{ textAlign: 'center' }}>
            Acesse a página de Pedidos{'\n'}para acompanhar a sua entrega
          </GlobalText>
        </Animated.View>
        <Animated.View style={[styles.top, animatedStyle]}>
          <Button isOutline onPress={() => router.push('/History/')}>
            Ver pedidos
          </Button>
        </Animated.View>
      </Container>
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  message: {
    width: 200,
    height: 140,
    borderRadius: 16,
    alignItems: 'center',
  },
  title: {
    color: theme.colors.success,
  },
  top: {
    marginTop: 56,
    width: '100%',
  },
});

export default PurchaseSuccess;
