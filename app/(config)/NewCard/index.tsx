import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Input from '@/components/Input/Input';
import { CreditCard } from '@/assets/icons';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/global/theme';
import { Button } from '@/components/Button/Button';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { Container, Row } from './styles';

const NewCard = () => {
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(SignupSchema),
  });

  const params = useLocalSearchParams();

  const { path } = params;

  const [isOpen, setIsOpen] = useState(false);

  const handleGoBack = () => {
    switch (path) {
      case 'Payment':
        router.push('/Payment/Payment');
        break;
      case 'Address':
        router.push('/MyCards/');
        break;
      default:
        router.push('/MyCards/');
        break;
    }
  };

  const onSubmit = () => {
    setIsOpen(true);
  };

  return (
    <GlobalContainer>
      <Header onPress={() => router.push('/Settings/')} title="Cartão" />
      <Container>
        <Input
          name="number"
          control={control}
          type="credit-card"
          keyboardType="decimal-pad"
          placeholder="Informe o número do cartão"
          label="Número do cartão"
          iconLeft={<CreditCard />}
          containerStyle={styles.input}
        />
        <Row>
          <View style={styles.width}>
            <Input
              name="validity"
              control={control}
              type="datetime"
              maxLength={5}
              keyboardType="decimal-pad"
              placeholder="Ex: 00/00"
              label="Validade"
              iconLeft={<CreditCard />}
              containerStyle={styles.input}
            />
          </View>
          <View style={styles.width}>
            <Input
              name="cvv"
              control={control}
              maxLength={3}
              keyboardType="decimal-pad"
              placeholder="Ex: 000"
              label="CVV"
              iconLeft={<CreditCard />}
              containerStyle={styles.input}
            />
          </View>
        </Row>
        <Input
          name="cvv"
          control={control}
          placeholder="Informe o nome no cartão"
          label="Nome no cartão"
          iconLeft={<CreditCard />}
          containerStyle={styles.input}
        />
        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 56 }}>
          Salvar
        </Button>
      </Container>
      <ModalSuccess
        isOpen={isOpen}
        title="Sucesso"
        description="Cartão foi salvo!"
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
  width: {
    width: '45%',
  },
});

export default NewCard;
