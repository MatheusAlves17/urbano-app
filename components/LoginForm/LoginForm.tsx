import { TouchableOpacity, ViewStyle } from 'react-native';

import BottomSheet from '@gorhom/bottom-sheet';

import { forwardRef, useState } from 'react';

import { Close, Email, Lock } from '@/assets/icons';
import { useForm } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import { FormLogin, LoginSchema } from '@/validation/Login.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks/useAuth';
import { Content, Header, TextLink, Title } from './styles';
import Input from '../Input/Input';
import { Button } from '../Button/Button';

type LoginFormProps = {
  onClose: () => void;
  style?: ViewStyle;
};

export const LoginForm = forwardRef<BottomSheet, LoginFormProps>(
  ({ onClose, style }, ref) => {
    const router = useRouter();

    const { login } = useAuth();

    const { control, handleSubmit } = useForm<FormLogin>({
      resolver: yupResolver(LoginSchema),
      defaultValues: __DEV__
        ? { email: 'matheus@gmail.com', password: 'Matt234@' }
        : {},
    });

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (dataForm: FormLogin) => {
      try {
        const { data } = await api.post('user/session', {
          email: dataForm.email,
          password: dataForm.password,
        });

        setIsLoading(true);

        login(data);

        router.push('/Home/');
      } catch (error) {
        handleError('Usuário e/ou senha inválidos');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <BottomSheet index={0} snapPoints={[0.01, 500]} ref={ref} style={style}>
        <Content>
          <Header>
            <Title>Faça login</Title>
            <TouchableOpacity onPress={onClose}>
              <Close />
            </TouchableOpacity>
          </Header>
          <Input
            control={control}
            name="email"
            label="E-mail"
            placeholder="Informe seu e-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            iconLeft={<Email />}
          />
          <Input
            control={control}
            name="password"
            label="Senha"
            placeholder="Informe sua senha"
            autoCapitalize="none"
            password
            iconLeft={<Lock />}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
          <TextLink>Esqueci a senha</TextLink>
          <Button isLoading={isLoading} onPress={handleSubmit(onSubmit)}>
            Fazer login
          </Button>
        </Content>
      </BottomSheet>
    );
  },
);
