import { Clock01 } from '@/assets/pictures';
import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle } from '@/global/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/format';
import { Button } from '@/components/Button/Button';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { shadow } from '@/global/shadow';
import { Card, CardName, CardPrice, Container, ImageItems } from './styles';

interface IProductsItems {
  id: string;
  price: number;
  name: string;

  image: JSX.Element;
  isSelected?: boolean;
}

const Orders = [
  {
    id: '2134',
    status: 'em preparação',
    items: [
      {
        id: '1',
        price: 500,
        name: 'Relógio 1',
        image: Clock01,
      },
      {
        id: '2',
        price: 250,
        name: 'Relógio 2',
        image: Clock01,
      },
    ],
  },
];
const OrderDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [productsItem, setProductsItems] = useState<IProductsItems[]>(
    Orders.flatMap(item => item.items),
  );

  const handleGoBack = () => {
    setIsOpen(false);
    router.push('/(main)/History');
  };

  const getOrders = () => {
    const newItems = productsItem.map(item => ({ ...item, isSelected: false }));
    setProductsItems(newItems);
  };

  const handleSelectItems = (item_id: string) => {
    const newItems = productsItem.map(item => {
      if (item_id === item.id) {
        return {
          ...item,
          isSelected: !item.isSelected,
        };
      }
      return item;
    });
    setProductsItems(newItems);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <GlobalContainer>
      <Header onPress={() => router.back()} title="Detalhes do pedido" />
      <Container>
        <GlobalSubtitle>Selecione os itens para devolução</GlobalSubtitle>
        {productsItem.map(item => (
          <Card
            style={{ ...shadow.default }}
            key={item.id}
            isSelected={item?.isSelected}
            onPress={() => handleSelectItems(item.id)}
          >
            <ImageItems source={item.image} />
            <CardName>{item?.name}</CardName>
            <CardPrice>{formatCurrency(item?.price)}</CardPrice>
          </Card>
        ))}
        <Button style={{ marginTop: 40 }} onPress={() => setIsOpen(true)}>
          Devolver itens
        </Button>
      </Container>
      <ModalSuccess
        isOpen={isOpen}
        title="Sucesso"
        description="Sua solicitação para devolução dos produtos foi enviada"
        isTransparent
        onClose={handleGoBack}
      />
    </GlobalContainer>
  );
};

export default OrderDetails;
