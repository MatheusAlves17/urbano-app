import Header from '@/components/Header/Header';
import {
  GlobalContainer,
  GlobalLink,
  GlobalSubtitle,
  GlobalText,
} from '@/global/styles';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowDown, CreditCardIcon } from '@/assets/icons';
import { ActivityIndicator, View } from 'react-native';
import { theme } from '@/global/theme';
import { useEffect, useRef, useState } from 'react';
import Summary from '@/components/Summary/Summary';
import BottomSheet from '@gorhom/bottom-sheet';
import { prettyLog } from '@/services/prettyLog';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import { Button } from '@/components/Button/Button';
import { ICard } from '@/interfaces/Cards';
import { ICardPayment } from '@/interfaces/Payment';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/format';
import {
  Card,
  Container,
  HideNumber,
  IconWrapper,
  Input,
  MaskNumber,
  PaymentNumber,
  PaymentValue,
} from './styles';

const Payment = () => {
  const { valueWithDiscount, valueTotal, coupon } = useCart();

  const [isLoading, setIsLoading] = useState(false);
  const [remaning, setRemaning] = useState(valueWithDiscount);

  const [cards, setCards] = useState<ICard[]>([]);

  const [cardsPayment, setCardsPayment] = useState<ICardPayment[]>([]);

  const [cardId, setCardId] = useState('');
  const [cardValue, setCardValue] = useState(0);
  const [cardNumber, setCardNumber] = useState('');

  const { order_id } = useLocalSearchParams();

  const summaryRef = useRef<BottomSheet | null>(null);

  const handleOpenForm = () => {
    summaryRef.current?.expand();
  };

  const handleCloseForm = () => {
    summaryRef.current?.snapToIndex(0);
  };

  const handleSelectCard = (card_id: string) => {
    const newCards: ICard[] = cards.map(item => {
      if (item.id === card_id) {
        setCardNumber(item.number);
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });

    setCardId(card_id);
    setCards(newCards);
  };

  const handleCalculateRemaining = () => {
    if (cardValue < 10) {
      return handleError('Valor mínimo deve ser de R$ 10,00');
    }

    const cardExists = cardsPayment.findIndex(card => card.id === cardId);

    if (cardExists !== -1) {
      const updatedCards = [...cardsPayment];
      updatedCards[cardExists].value = cardValue;
      setCardsPayment(updatedCards);
    } else {
      const payment = {
        id: cardId,
        value: cardValue,
        number: cardNumber,
      };
      setCardsPayment([...cardsPayment, payment]);
    }
  };
  const handleCardValue = (value: string) => {
    setCardValue(parseFloat(value));
  };

  const getCards = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`user/cards`);
      setCards(response.data);
    } catch (error) {
      handleError('Não foi possível encontrar seus cartões, tente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  useEffect(() => {
    const newCards = cardsPayment.map(card => card.value);
    const valueCard = newCards.reduce(
      (acumulator, total) => acumulator + total,
      0,
    );
    setRemaning(valueWithDiscount - valueCard);
  }, [cardsPayment, valueWithDiscount]);

  return (
    <GlobalContainer>
      <Header
        title="Forma de pagamento"
        onPress={() => router.push('/Basket/')}
      />
      {isLoading && (
        <ActivityIndicator color={theme.colors.primary_01} size={24} />
      )}
      {cards.length === 0 && !isLoading ? (
        <GlobalText>Não há cartões cadastrados ainda</GlobalText>
      ) : (
        <>
          <Container>
            <GlobalSubtitle>Selecione a forma de pagamento</GlobalSubtitle>
            <GlobalLink>Valor restante {formatCurrency(remaning)}</GlobalLink>
            {cards.map(item => (
              <Card
                key={item.id}
                onPress={() => handleSelectCard(item.id)}
                isSelected={!!item.selected}
              >
                <IconWrapper>
                  <CreditCardIcon />
                </IconWrapper>
                <View>
                  <PaymentNumber>{item.number}</PaymentNumber>
                  {item.selected && (
                    <HideNumber>
                      <PaymentValue>Valor a ser debitado: </PaymentValue>
                      <Input
                        placeholder="R$ 0"
                        placeholderTextColor={`${theme.colors.primary_01}20`}
                        keyboardType="decimal-pad"
                        onChangeText={handleCardValue}
                        onSubmitEditing={handleCalculateRemaining}
                        onBlur={handleCalculateRemaining}
                      />
                    </HideNumber>
                  )}
                </View>
              </Card>
            ))}
          </Container>
          {remaning === 0 && (
            <Button
              onPress={() =>
                router.push({
                  pathname: '/Resume/',
                  params: {
                    cardsPayment: JSON.stringify(cardsPayment),
                    order_id,
                  },
                })
              }
            >
              Continuar
            </Button>
          )}
          {/* <ArrowDown onPress={handleOpenForm} style={{ alignSelf: 'center' }} />
          <Summary
            ref={summaryRef}
            onClose={handleCloseForm}
            paymentScreen="Payment"
            cards={cardsPayment}
          /> */}
        </>
      )}
    </GlobalContainer>
  );
};

export default Payment;
