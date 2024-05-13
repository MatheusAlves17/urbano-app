import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { useRouter } from 'expo-router';
import { CouponIcon } from '@/assets/icons';
import { View } from 'react-native';
import { formatCurrency } from '@/utils/format';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { shadow } from '@/global/shadow';
import { useCart } from '@/hooks/useCart';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import {
  Card,
  CouponCode,
  Container,
  IconWrapper,
  CouponValue,
} from './styles';

interface ICoupon {
  id: string;
  value: string;
  isUsed: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  selected?: boolean;
}

const Coupon = () => {
  const router = useRouter();
  const { addCoupon } = useCart();

  const [coupons, setCoupons] = useState<ICoupon[]>([]);

  const handleSelectCoupon = (coupon_id: string, value: number) => {
    const newCoupons = coupons.map(item => {
      if (coupon_id === item.id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
    setCoupons(newCoupons);

    addCoupon({ id: coupon_id, value });
  };

  const handleSaveCoupons = () => {
    router.push('/Basket/');
  };

  const getCoupons = async () => {
    try {
      const response = await api.get('my-coupons');
      setCoupons(response.data);
    } catch (error) {
      handleError('Não foi possível encontrar cupons');
    }
  };

  useEffect(() => {
    getCoupons();
  }, []);

  return (
    <GlobalContainer>
      <Header title="Cupons" onPress={handleSaveCoupons} />
      <Container>
        {coupons.map(item => (
          <Card
            style={{ ...shadow.default }}
            isSelected={item?.selected}
            key={item.id}
            onPress={() => handleSelectCoupon(item.id, parseFloat(item.value))}
          >
            <IconWrapper>
              <CouponIcon />
            </IconWrapper>
            <View>
              <CouponCode>Cupom disponível</CouponCode>
              <CouponValue>
                {formatCurrency(parseFloat(item.value))} Off
              </CouponValue>
            </View>
          </Card>
        ))}
        <Button style={{ marginTop: 32 }} onPress={handleSaveCoupons}>
          Salvar cupons
        </Button>
      </Container>
    </GlobalContainer>
  );
};

export default Coupon;
