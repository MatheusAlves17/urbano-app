import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { router } from 'expo-router';
import { Check, Document, Email, Pen, Smartphone, User } from '@/assets/icons';
import { useState } from 'react';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/global/theme';
import { shadow } from '@/global/shadow';
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
  const [isEditing, setIsEditing] = useState(false);
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(SignupSchema),
  });

  const onSubmit = () => {
    setIsEditing(false);
  };

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
              <TextInput>Rodrigo Gonçalves</TextInput>
            </InputContainer>
            <ErrorMessage />
          </View>
          <View style={styles.top}>
            <Label>CPF</Label>
            <InputContainer style={{ ...shadow.default }}>
              <Document />
              <TextInput>123.456.789-90</TextInput>
            </InputContainer>
            <ErrorMessage />
          </View>
          <View style={styles.top}>
            <Label>Telefone</Label>
            <InputContainer style={{ ...shadow.default }}>
              <Smartphone />
              <TextInput>(11) 94002-8922</TextInput>
            </InputContainer>
            <ErrorMessage />
          </View>
          <View style={styles.top}>
            <Label>E-mail</Label>
            <InputContainer style={{ ...shadow.default }}>
              <Email />
              <TextInput>rodrigo.gonçalves@gmail.com</TextInput>
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
