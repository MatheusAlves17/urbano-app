import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle, GlobalText } from '@/global/styles';
import { ArrowDown } from '@/assets/icons';
import { useRef } from 'react';
import Summary from '@/components/Summary/Summary';
import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { CartCard } from '@/components/CartCard/CartCard';
import { useCart } from '@/hooks/useCart';
import { IProduct } from '@/interfaces/Product';
import { Content } from './styles';

const Basket = () => {
  const { cartItems } = useCart();
  const summaryRef = useRef<BottomSheet | null>(null);

  const handleOpenForm = () => {
    summaryRef.current?.expand();
  };

  const handleCloseForm = () => {
    summaryRef.current?.snapToIndex(0);
  };

  return (
    <GlobalContainer>
      <Header title="Cesta de produtos" onPress={() => router.back()} />
      <Content>
        <GlobalSubtitle>Itens adicionados</GlobalSubtitle>
        {cartItems.length > 0 ? (
          cartItems.map((item: IProduct) => <CartCard item={item} />)
        ) : (
          <GlobalText>Seu carrinho ainda está vazio</GlobalText>
        )}
      </Content>
      <ArrowDown onPress={handleOpenForm} />
      <Summary
        ref={summaryRef}
        onClose={handleCloseForm}
        paymentScreen="Basket"
      />
    </GlobalContainer>
  );
};

export default Basket;
