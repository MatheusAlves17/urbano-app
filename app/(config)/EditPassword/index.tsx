import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import { GlobalContainer } from '@/global/styles';
import { useForm } from 'react-hook-form';
import { Lock } from '@/assets/icons';
import { theme } from '@/global/theme';
import { StyleSheet } from 'react-native';
import { Button } from '@/components/Button/Button';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { useState } from 'react';
import { router } from 'expo-router';
import { PasswordForm, PasswordSchema } from '@/validation/Profile.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import { Container } from './styles';

const EditPassword = () => {
  const { control, handleSubmit } = useForm<PasswordForm>({
    resolver: yupResolver(PasswordSchema),
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleGoBack = () => {
    setIsOpen(false);
    router.push('/Settings/');
  };

  const onSubmit = async (dataForm: PasswordForm) => {
    const data = {
      currentPassword: dataForm.currentPassword,
      newPassword: dataForm.newPassword,
      confirmNewPassword: dataForm.confirmNewPassword,
    };

    try {
      const response = await api.put(`user/update/password`, data);
      console.log(response);
    } catch (error) {
      handleError(error);
    }
    setIsOpen(true);
  };

  return (
    <GlobalContainer>
      <Header title="Editar senha" />
      <Container>
        <Input
          control={control}
          name="currentPassword"
          iconLeft={<Lock />}
          label="Senha antiga"
          placeholder="********"
          password
          containerStyle={styles.input}
          autoCapitalize="none"
        />
        <Input
          control={control}
          name="newPassword"
          iconLeft={<Lock />}
          label="Nova senha"
          placeholder="********"
          password
          containerStyle={styles.input}
          autoCapitalize="none"
        />
        <Input
          control={control}
          name="confirmNewPassword"
          iconLeft={<Lock />}
          label="Confirmação de senha"
          placeholder="********"
          password
          containerStyle={styles.input}
          autoCapitalize="none"
        />
        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 56 }}>
          Salvar nova senha
        </Button>
      </Container>
      <ModalSuccess
        isOpen={isOpen}
        title="Sucesso"
        description="Sua senha foi redefinida"
        isTransparent
        onClose={handleGoBack}
      />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.background,
  },
});

export default EditPassword;
