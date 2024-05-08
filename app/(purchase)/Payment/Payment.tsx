import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle } from '@/global/styles';
import { router } from 'expo-router';
import { ArrowDown, CreditCardIcon } from '@/assets/icons';
import { View } from 'react-native';
import { theme } from '@/global/theme';
import { useEffect, useRef, useState } from 'react';
import Summary from '@/components/Summary/Summary';
import BottomSheet from '@gorhom/bottom-sheet';
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

interface ICard {
  id: string;
  last_numbers: string;
  name: string;
  selected?: boolean;
}

const DataCard = [
  {
    id: 'f31c4',
    last_numbers: '5010',
    name: 'Rodrigo Gonçalves',
  },

  {
    id: 'f3lc4',
    last_numbers: '5089',
    name: 'Rodrigo Gonçalves',
  },
  {
    id: '4c13f',
    last_numbers: '7980',
    name: 'Rodrigo Gonçalves',
  },
];

const Payment = () => {
  const [cards, setCards] = useState<ICard[]>(DataCard);

  const summaryRef = useRef<BottomSheet | null>(null);

  const handleOpenForm = () => {
    summaryRef.current?.expand();
  };

  const handleCloseForm = () => {
    summaryRef.current?.snapToIndex(0);
  };

  const handleSelectCard = (card_id: string) => {
    const newCoupons = cards.map(item => {
      if (item.id === card_id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
    setCards(newCoupons);
  };

  const getCards = () => {
    const newArray = cards.map(item => ({ ...item, selected: false }));
    setCards(newArray);
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <GlobalContainer>
      <Header
        title="Forma de pagamento"
        onPress={() => router.push('/Basket/')}
      />
      <Container>
        <GlobalSubtitle>Selecione a forma de pagamento</GlobalSubtitle>
        {cards.map(item => (
          <Card
            key={item.id}
            onPress={() => handleSelectCard(item.id)}
            isSelected={item.selected}
          >
            <IconWrapper>
              <CreditCardIcon />
            </IconWrapper>
            <View>
              <View style={{ flexDirection: 'row' }}>
                <HideNumber>
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                </HideNumber>
                <HideNumber>
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                </HideNumber>
                <HideNumber>
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                </HideNumber>
                <PaymentNumber>{item.last_numbers}</PaymentNumber>
              </View>
              {item.selected && (
                <HideNumber>
                  <PaymentValue>Valor a ser debitado: </PaymentValue>
                  <Input
                    placeholder="R$ 0"
                    placeholderTextColor={`${theme.colors.primary_01}20`}
                    keyboardType="decimal-pad"
                  />
                </HideNumber>
              )}
            </View>
          </Card>
        ))}
        <ArrowDown onPress={handleOpenForm} style={{ alignSelf: 'center' }} />
      </Container>

      <Summary
        ref={summaryRef}
        onClose={handleCloseForm}
        paymentScreen="Payment"
      />
    </GlobalContainer>
  );
};

export default Payment;
