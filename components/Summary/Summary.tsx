import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ArrowDown, Close, CouponIcon, Pin, PinLight } from '@/assets/icons';
import { GlobalLink, GlobalScrollView } from '@/global/styles';
import { theme } from '@/global/theme';
import BottomSheet from '@gorhom/bottom-sheet';

import { forwardRef } from 'react';
import { useRouter } from 'expo-router';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/hooks/useCart';
import { api } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import { prettyLog } from '@/services/prettyLog';
import { handleError } from '@/utils/handleError';
import {
  Container,
  Divider,
  IconWrapper,
  Row,
  Span,
  Subtitle,
  Title,
} from './styles';
import { Button } from '../Button/Button';

interface SummaryProps {
  onClose?: () => void;
  paymentScreen: string;
}

const Summary = forwardRef<BottomSheet, SummaryProps>(
  ({ onClose, paymentScreen }, ref) => {
    const router = useRouter();
    const { user } = useAuth();

    const { addressId, valueTotal, cartItems } = useCart();

    const handleGoTo = () => {
      if (addressId) {
        return handleError('Escolha uma opção de endereço');
      }
      switch (paymentScreen) {
        case 'Basket':
          handleGoToPayment();
          break;
        default:
          router.push('/PurchaseSuccess/PurchaseSuccess');
          break;
      }
    };

    const handleGoToPayment = async () => {
      try {
        const response = await api.post('order', {
          delivery: 20,
          value_total: valueTotal,
          status_id: '6fdffb92-f4a0-4a3c-9488-941bdbc1c11a',
          user_id: user.id,
          address_id: addressId,
        });
        createOrderItems(response.data.id);
      } catch (error) {
        handleError(error);
      }
    };

    const createOrderItems = async (order_id: string) => {
      try {
        for (const item of cartItems) {
          await api.post('item', {
            name: item.name,
            price: item.price,
            file: item.path,
            order_id,
            product_id: item.id,
            status_id: '6fdffb92-f4a0-4a3c-9488-941bdbc1c11a',
            user_id: user.id,
          });
        }
        router.push({ pathname: '/Payment/Payment', params: { order_id } });
      } catch (error) {
        prettyLog(error);
        handleError('Ocorreu um erro, tente mais tarde aqui');
      }
    };

    return (
      <BottomSheet index={0} snapPoints={[10, 600]} ref={ref}>
        <Container>
          <Close onPress={onClose} style={{ alignSelf: 'flex-end' }} />
          <Row>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconWrapper>
                <CouponIcon />
              </IconWrapper>
              <View>
                <Title>Cupom</Title>
                <Span>5 disponíveis</Span>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.push('/Coupon/Coupon')}>
              <GlobalLink>Adicionar cupom</GlobalLink>
            </TouchableOpacity>
          </Row>
          <Row>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconWrapper>
                <PinLight />
              </IconWrapper>

              <View>
                <Title>Endereço</Title>
                <Span>
                  {addressId
                    ? 'Endereço selecionado'
                    : 'Escolha o endereço de entrega'}
                </Span>
              </View>
            </View>
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/Delivery/Delivery',
                  params: { path: 'Basket' },
                })
              }
            >
              <GlobalLink>Trocar endereço</GlobalLink>
            </TouchableOpacity>
          </Row>
          <Title>Resumo da compra</Title>
          <Row>
            <Subtitle>Subtotal</Subtitle>
            <Subtitle>{formatCurrency(valueTotal)}</Subtitle>
          </Row>
          <Row>
            <Subtitle>Cupom aplicado</Subtitle>
            <Subtitle>- R$ 120.85</Subtitle>
          </Row>
          <Row>
            <Subtitle>Taxa de entrega</Subtitle>
            <Subtitle>- R$ 20</Subtitle>
          </Row>

          {/* {paymentScreen && (
          <View>
            <Title>Resumo do pagamento</Title>
            <Row>
              <Subtitle># 0235</Subtitle>
              <Subtitle>- R$ 250</Subtitle>
            </Row>
            <Row>
              <Subtitle># 3542</Subtitle>
              <Subtitle>- R$ 250</Subtitle>
            </Row>
          </View>
        )} */}

          <Divider style={{ marginTop: 16 }} />
          <Row>
            <Title style={{ marginTop: 0 }}>Total</Title>
            <Title style={{ marginTop: 0 }}>{formatCurrency(valueTotal)}</Title>
          </Row>
          <Divider />

          <Button style={{ marginTop: 30 }} onPress={handleGoTo}>
            Continuar
          </Button>
        </Container>
      </BottomSheet>
    );
  },
);
export default Summary;
