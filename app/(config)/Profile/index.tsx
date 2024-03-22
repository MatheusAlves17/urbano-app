import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { router } from 'expo-router';
import { Check, Document, Email, Pen, Smartphone, User } from '@/assets/icons';
import { useEffect, useState } from 'react';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';
import { useAuth } from '@/hooks/useAuth';
import { yupResolver } from '@hookform/resolvers/yup';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { ProfileForm, ProfileSchema } from '@/validation/Profile.validation';
import {
  Container,
  ErrorMessage,
  InputContainer,
  Label,
  Row,
  Subtitle,
  TextInput,
} from './styles';

const Profile = () => {
  const { user, setUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { control, handleSubmit, setValue } = useForm<ProfileForm>({
    resolver: yupResolver(ProfileSchema),
  });

  const onSubmit = async (dataForm: ProfileForm) => {
    setIsEditing(false);

    const data = {
      name: dataForm.name,
      cpf: dataForm.cpf,
      email: dataForm.email,
      phone: dataForm.phone,
    };

    try {
      const response = await api.put(`user/update`, data);
      setIsOpen(true);
      setUser({ ...user, ...response.data });
    } catch (error) {
      handleError(
        'Ocorreu um erro ao atualizar as informações, por favor tente mais tarde.',
      );
    } finally {
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('cpf', user.cpf);
      setValue('phone', user.phone);
      setValue('email', user.email);
    }
  }, [user]);

  return (
    <GlobalContainer>
      <Header onPress={() => router.push('/Settings/')} title="Meu perfil" />
      {!isEditing ? (
        <Container>
          <Row onPress={() => setIsEditing(true)}>
            <Subtitle>Editar perfil</Subtitle>
            <Pen />
          </Row>
          <View style={styles.top}>
            <Label>Nome completo</Label>
            <InputContainer style={{ ...shadow.default }}>
              <User />
              <TextInput>{user.name}</TextInput>
            </InputContainer>
            <ErrorMessage />
          </View>
          <View style={styles.top}>
            <Label>CPF</Label>
            <InputContainer style={{ ...shadow.default }}>
              <Document />
              <TextInput>{user.cpf}</TextInput>
            </InputContainer>
            <ErrorMessage />
          </View>
          <View style={styles.top}>
            <Label>Telefone</Label>
            <InputContainer style={{ ...shadow.default }}>
              <Smartphone />
              <TextInput>{user.phone}</TextInput>
            </InputContainer>
            <ErrorMessage />
          </View>
          <View style={styles.top}>
            <Label>E-mail</Label>
            <InputContainer style={{ ...shadow.default }}>
              <Email />
              <TextInput>{user.email}</TextInput>
            </InputContainer>
            <ErrorMessage />
          </View>
        </Container>
      ) : (
        <Container>
          <Row onPress={handleSubmit(onSubmit)}>
            <Subtitle>Editar perfil</Subtitle>
            <Check />
          </Row>
          <Input
            control={control}
            name="name"
            iconLeft={<User />}
            label="Nome completo"
            placeholder="Informe o nome completo"
            containerStyle={styles.input}
            autoCapitalize="words"
          />
          <Input
            control={control}
            name="cpf"
            iconLeft={<Document />}
            label="CPF"
            placeholder="Informe o CPF"
            containerStyle={styles.input}
            keyboardType="decimal-pad"
            type="cpf"
          />
          <Input
            control={control}
            name="phone"
            iconLeft={<Smartphone />}
            label="Telefone"
            placeholder="Informe o telefone"
            containerStyle={styles.input}
            keyboardType="decimal-pad"
            type="cel-phone"
          />
          <Input
            control={control}
            name="email"
            iconLeft={<Email />}
            label="E-mail"
            placeholder="Informe o e-mail"
            containerStyle={styles.input}
            keyboardType="email-address"
          />
        </Container>
      )}
      <ModalSuccess
        isOpen={isOpen}
        isTransparent
        title="Sucesso!"
        description="Alteração de usuário foi salva."
        onClose={() => setIsOpen(false)}
      />
    </GlobalContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.background,
  },
  top: {
    marginTop: 8,
  },
});

export default Profile;
