import React, { useRef } from 'react';
import { ImageBackground } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

import { Button } from '@/components/Button/Button';
import { LoginForm } from '@/components/LoginForm/LoginForm';

import { Background, Logotipo } from '@/assets/icons';

import { GlobalContainer } from '@/global/styles';

import { shadow } from '@/global/shadow';
import { useRouter } from 'expo-router';
import { Content } from './styles';

const Login = () => {
  const router = useRouter();

  const loginFormRef = useRef<BottomSheet | null>(null);

  const handleGoMenu = () => {
    handleOpenForm();
  };

  const handleOpenForm = () => {
    loginFormRef.current?.expand();
  };

  const handleCloseForm = () => {
    loginFormRef.current?.snapToIndex(0);
  };

  return (
    <GlobalContainer>
      <ImageBackground
        source={Background}
        style={{ width: '100%', height: '80%' }}
        resizeMode="contain"
      >
        <Content>
          <Logotipo style={{ marginBottom: 80 }} />
          <Button onPress={handleGoMenu}>Faça login</Button>
          <Button isOutline onPress={() => router.push('/Signup/')}>
            Cadastre-se
          </Button>
        </Content>
      </ImageBackground>
      <LoginForm
        ref={loginFormRef}
        onClose={handleCloseForm}
        style={{ ...shadow.dark }}
      />
    </GlobalContainer>
  );
};

export default Login;
