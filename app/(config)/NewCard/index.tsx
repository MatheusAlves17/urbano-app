import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { router, useLocalSearchParams } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Input from '@/components/Input/Input';
import { CreditCardIcon } from '@/assets/icons';
import { StyleSheet, View } from 'react-native';
import { theme } from '@/global/theme';
import { Button } from '@/components/Button/Button';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import { CreditCardForm, CreditCardSchema } from '@/validation/Card.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/hooks/useAuth';
import { prettyLog } from '@/services/prettyLog';
import { Container, Row } from './styles';

const NewCard = () => {
  const { user } = useAuth();

  const { control, handleSubmit, setValue } = useForm<CreditCardForm>({
    resolver: yupResolver(CreditCardSchema),
  });

  const params = useLocalSearchParams();

  const { path, card_id } = params;

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    switch (path) {
      case 'Payment':
        router.push('/Payment/Payment');
        break;
      case 'MyCards':
        router.push('/MyCards/');
        break;
      default:
        router.push('/MyCards/');
        break;
    }
  };

  const onSubmitEditCard = async (dataForm: CreditCardForm) => {
    setIsLoading(true);
    try {
      const response = await api.put(`user/card`, {
        id: card_id,
        number: dataForm.number,
        validity: dataForm.validity,
        cvv: dataForm.cvv,
        name: dataForm.name,
        user_id: user.id,
      });
      setIsOpen(true);
    } catch (error) {
      handleError('Não foi possível adicionar o cartão, tente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitNewCard = async (dataForm: CreditCardForm) => {
    setIsLoading(true);
    try {
      const response = await api.post(`user/card`, {
        number: dataForm.number,
        validity: dataForm.validity,
        cvv: dataForm.cvv,
        name: dataForm.name,
        user_id: user.id,
        flag: dataForm.flag,
      });
      setIsOpen(true);
    } catch (error) {
      prettyLog(error);

      handleError('Não foi possível adicionar o cartão, tente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const getCard = async () => {
    try {
      const response = await api.get(`user/card`);
      setValue('number', response.data.number);
      setValue('validity', response.data.validity);
      setValue('cvv', response.data.cvv);
      setValue('flag', response.data.flag);
      setValue('name', response.data.name);
    } catch (error) {
      handleError('Não foi possível encontrar o cartão');
    }
  };

  useEffect(() => {
    if (card_id !== 'false') {
      getCard();
    }
  });

  return (
    <GlobalContainer>
      <Header onPress={handleGoBack} title="Cartão" />
      <Container>
        <Input
          name="number"
          control={control}
          type="credit-card"
          keyboardType="decimal-pad"
          placeholder="Informe o número do cartão"
          label="Número do cartão"
          iconLeft={<CreditCardIcon />}
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
              iconLeft={<CreditCardIcon />}
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
              iconLeft={<CreditCardIcon />}
              containerStyle={styles.input}
            />
          </View>
        </Row>
        <Input
          name="flag"
          control={control}
          placeholder="Informe a bandeira do cartão"
          label="Bandeira do cartão"
          iconLeft={<CreditCardIcon />}
          containerStyle={styles.input}
          autoCapitalize="words"
        />
        <Input
          name="name"
          control={control}
          placeholder="Informe o nome no cartão"
          label="Nome no cartão"
          iconLeft={<CreditCardIcon />}
          containerStyle={styles.input}
          autoCapitalize="words"
        />
        {card_id !== 'false' ? (
          <Button
            onPress={handleSubmit(onSubmitEditCard)}
            style={{ marginTop: 56 }}
            isLoading={isLoading}
          >
            Editar
          </Button>
        ) : (
          <Button
            onPress={handleSubmit(onSubmitNewCard)}
            style={{ marginTop: 56 }}
            isLoading={isLoading}
          >
            Salvar
          </Button>
        )}
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
