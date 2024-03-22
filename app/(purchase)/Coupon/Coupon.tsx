import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { useRouter } from 'expo-router';
import { CouponIcon } from '@/assets/icons';
import { View } from 'react-native';
import { formatCurrency } from '@/utils/format';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
import { shadow } from '@/global/shadow';
import {
  Card,
  CouponCode,
  Container,
  IconWrapper,
  CouponValue,
} from './styles';

interface ICoupon {
  id: string;
  value: number;
  selected?: boolean;
}

const DataCoupon = [
  {
    id: 'f31c4',
    value: 50,
  },

  {
    id: 'f3lc4',
    value: 70,
  },
  {
    id: '4c13f',
    value: 70,
  },
];

const Coupon = () => {
  const router = useRouter();

  const [coupons, setCoupons] = useState<ICoupon[]>(DataCoupon);

  const handleSelectCoupon = (coupon_id: string) => {
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
  };

  const handleSaveCoupons = () => {
    router.push('/Basket/');
  };

  const getCoupons = () => {
    const newItems = coupons.map(item => ({ ...item, isSelected: false }));
    setCoupons(newItems);
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
            onPress={() => handleSelectCoupon(item.id)}
          >
            <IconWrapper>
              <CouponIcon />
            </IconWrapper>
            <View>
              <CouponCode>Cod: {item.id}</CouponCode>
              <CouponValue>{formatCurrency(item.value)} Off</CouponValue>
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
