import Header from '@/components/Header/Header';
import { shadow } from '@/global/shadow';
import { GlobalContainer, GlobalLink, GlobalText } from '@/global/styles';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/utils/format';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ICardPayment } from '@/interfaces/Payment';
import { Button } from '@/components/Button/Button';
import { useState } from 'react';
import { api } from '@/services/api';
import { handleError, handleSuccess } from '@/utils/handleError';
import { prettyLog } from '@/services/prettyLog';
import { Content, ContentTitle, Divider, Row, Span } from './styles';

const Resume = () => {
  const router = useRouter();
  const { cartItems, coupon, valueWithDiscount, removeFromCart } = useCart();

  const params = useLocalSearchParams() as any;
  const { cardsPayment, order_id } = params;
  const payments = JSON.parse(cardsPayment);

  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);

    const cards = payments.map((card: ICardPayment) => {
      return {
        id: card.id,
        value: card.value,
      };
    });

    try {
      const response = await api.post(`payment?order_id=${order_id}`, {
        cards,
        coupon,
      });
      handleSuccess(
        'Compra confirmada, acompanhe seu pedido na aba de Pedidos',
      );
      console.log(response.data);
      for (cart of cartItems) {
        removeFromCart(cart.id);
      }
    } catch (error) {
      prettyLog(error);
      handleError('Ocorreu uma falha, tente mais tarde');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlobalContainer>
      <Header
        title="Resumo do pagamento"
        onPress={() => router.push('/Payment/Payment')}
      />
      <Content
        style={{
          ...shadow.default,
        }}
      >
        <ContentTitle>Items adicionados</ContentTitle>
        {cartItems.map(cart => (
          <Row key={cart.id}>
            <GlobalText>{`${cart.quantity}x ${cart.name}`}</GlobalText>
            <Span>
              {formatCurrency(cart.quantity * parseFloat(cart.price))}
            </Span>
          </Row>
        ))}
        <Divider />
        <ContentTitle>Forma de pagamento</ContentTitle>
        {payments.map((payment: ICardPayment) => (
          <Row key={payment.id}>
            <GlobalText>{payment.number}</GlobalText>
            <Span>- {formatCurrency(payment.value)}</Span>
          </Row>
        ))}
        <Divider />
        <ContentTitle>Cupom</ContentTitle>
        {coupon?.id && (
          <Row key={coupon.id}>
            <GlobalText>Cupom aplicado</GlobalText>
            <Span>- {formatCurrency(coupon.value)}</Span>
          </Row>
        )}
        <Divider />
        <ContentTitle>Entrega</ContentTitle>
        <Row>
          <GlobalText>Frete</GlobalText>
          <Span>+ {formatCurrency(20)}</Span>
        </Row>
        <Divider />
        <ContentTitle>Total</ContentTitle>
        <Row>
          <GlobalText>Valor total</GlobalText>
          <Span>+ {formatCurrency(valueWithDiscount)}</Span>
        </Row>
      </Content>
      <Button onPress={handlePayment} isLoading={isLoading}>
        Finalizar compra
      </Button>
    </GlobalContainer>
  );
};

export default Resume;
