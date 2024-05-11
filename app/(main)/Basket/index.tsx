import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle, GlobalText } from '@/global/styles';
import { ArrowDown } from '@/assets/icons';
import { useEffect, useRef } from 'react';
import Summary from '@/components/Summary/Summary';
import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { CartCard } from '@/components/CartCard/CartCard';
import { useCart } from '@/hooks/useCart';
import { IProduct } from '@/interfaces/Product';
import { Content } from './styles';

const Basket = () => {
  const { cartItems, addressId } = useCart();

  const summaryRef = useRef<BottomSheet | null>(null);

  const handleOpenForm = () => {
    summaryRef.current?.expand();
  };

  const handleCloseForm = () => {
    summaryRef.current?.snapToIndex(0);
  };

  useEffect(() => {
    // if (addressId) {
    handleOpenForm();
    // }
  }, [addressId]);

  return (
    <GlobalContainer>
      <Header title="Cesta de produtos" onPress={() => router.back()} />
      {cartItems.length > 0 ? (
        <>
          <Content>
            <GlobalSubtitle>Itens adicionados</GlobalSubtitle>
            {cartItems.map((item: IProduct) => (
              <CartCard item={item} />
            ))}
          </Content>
          <ArrowDown onPress={handleOpenForm} />
          {/* <ArrowDown onPress={() => router.push('/Payment/Payment')} /> */}
          <Summary
            ref={summaryRef}
            onClose={handleCloseForm}
            paymentScreen="Basket"
          />
        </>
      ) : (
        <GlobalText>Seu carrinho ainda está vazio</GlobalText>
      )}
    </GlobalContainer>
  );
};

export default Basket;
