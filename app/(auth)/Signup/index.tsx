import { GlobalContainer, GlobalScrollView } from '@/global/styles';
import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import {
  Calendar,
  Close,
  Document,
  Email,
  Lock,
  Smartphone,
  User,
} from '@/assets/icons';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import Input from '@/components/Input/Input';
import { theme } from '@/global/theme';
import { Button } from '@/components/Button/Button';
import { SignupForm, SignupSchema } from '@/validation/Signup.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import { deleteItemAsync } from 'expo-secure-store';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { Header, Title } from './styles';

const Signup = () => {
  const router = useRouter();

  const { control, handleSubmit, getValues } = useForm<SignupForm>({
    resolver: yupResolver(SignupSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);

  const onSubmit = async (dataForm: SignupForm) => {
    console.log('chamou pelo menos');

    setIsLoading(true);

    const data = {
      name: dataForm.name,
      cpf: dataForm.cpf,
      phone: dataForm.phone,
      birth: dataForm.birth,
      email: dataForm.email,
      password: dataForm.password,
    };

    console.log(data);

    try {
      const response = await api.post(`user/signup`, data);
      console.log(response);
      setIsOpenSuccess(true);

      router.push('/Login/');
    } catch (error) {
      JSON.stringify(error);
      handleError('Não foi possível completar o cadastro, tente mais tarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalScrollView>
      <GlobalContainer>
        <Header>
          <Title>Cadastre-se</Title>
          <TouchableOpacity onPress={() => router.back()}>
            <Close />
          </TouchableOpacity>
        </Header>
        <Input
          control={control}
          name="name"
          label="Nome completo"
          placeholder="Informe seu nome"
          iconLeft={<User />}
          containerStyle={styles.input}
          autoCapitalize="words"
        />
        <Input
          control={control}
          name="birth"
          label="Data de nascimento"
          placeholder="Ex: 01/01/2006"
          iconLeft={<Calendar />}
          type="datetime"
          maxLength={10}
          containerStyle={styles.input}
        />
        <Input
          control={control}
          name="cpf"
          label="CPF"
          placeholder="Informe seu CPF"
          iconLeft={<Document />}
          type="cpf"
          containerStyle={styles.input}
        />
        <Input
          control={control}
          name="phone"
          label="Celular"
          placeholder="Informe seu celular"
          iconLeft={<Smartphone />}
          type="cel-phone"
          containerStyle={styles.input}
        />
        <Input
          control={control}
          name="email"
          label="E-mail"
          placeholder="Informe seu e-mail"
          keyboardType="email-address"
          autoCapitalize="none"
          iconLeft={<Email />}
          containerStyle={styles.input}
        />
        <Input
          control={control}
          name="password"
          label="Senha"
          placeholder="Informe sua senha"
          autoCapitalize="none"
          password
          iconLeft={<Lock />}
          containerStyle={styles.input}
        />
        <Input
          control={control}
          name="confirmPassword"
          label="Confirmação de senha"
          placeholder="Confirme sua senha"
          autoCapitalize="none"
          password
          iconLeft={<Lock />}
          onSubmitEditing={handleSubmit(onSubmit)}
          containerStyle={styles.input}
        />
        <Button
          style={{ marginTop: 32 }}
          isLoading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          Cadastrar
        </Button>
      </GlobalContainer>
      <ModalSuccess
        isOpen={isOpenSuccess}
        title="Sucesso!"
        description="Cadastro feito com sucesso! Vamos redirecioná-lo para fazer login"
        onClose={() => router.push('/Login/')}
      />
    </GlobalScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.background,
  },
});

export default Signup;
