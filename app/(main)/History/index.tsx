import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalLink, GlobalSubtitle } from '@/global/styles';
import { useRouter } from 'expo-router';
import { theme } from '@/global/theme';
import { Clock01 } from '@/assets/pictures';
import { shadow } from '@/global/shadow';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import { useEffect } from 'react';
import {
  Card,
  Container,
  Divider,
  ImageItems,
  Row,
  StatusIndicator,
  StatusOrder,
} from './styles';

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
  {
    id: '9876',
    status: 'entregue',
    items: [
      {
        id: '3',
        price: 580,
        name: 'Relógio 3',
        image: Clock01,
      },
      {
        id: '2',
        price: 365,
        name: 'Relógio 4',
        image: Clock01,
      },
      {
        id: '4',
        price: 962,
        name: 'Relógio 5',
        image: Clock01,
      },
    ],
  },
  {
    id: '2563',
    status: 'em troca/devolução',
    items: [
      {
        id: '3',
        price: 580,
        name: 'Relógio 6',
        image: Clock01,
      },
      {
        id: '2',
        price: 365,
        name: 'Relógio 7',
        image: Clock01,
      },
      {
        id: '4',
        price: 962,
        name: 'Relógio 8',
        image: Clock01,
      },
    ],
  },
];

const History = () => {
  const router = useRouter();
  const handleGotoOrder = (order_id: string) => {
    router.push('/OrderDetails/');
  };

  return (
    <GlobalContainer>
      <Header onPress={() => router.back()} title="Pedidos" />
      <Container>
        <GlobalSubtitle>Acompanhe seus pedidos</GlobalSubtitle>
        {Orders.map(item => (
          <Card
            key={item.id}
            onPress={() => handleGotoOrder(item.id)}
            style={{ ...shadow.default }}
          >
            <Row>
              {item.items.map(products => (
                <ImageItems source={products.image} key={products.id} />
              ))}
            </Row>
            <Divider />
            <Row>
              {item.status === 'em preparação' && (
                <StatusIndicator status={theme.colors.warning_02} />
              )}
              {item.status === 'entregue' && (
                <StatusIndicator status={theme.colors.success} />
              )}
              {item.status === 'em troca/devolução' && (
                <StatusIndicator status={theme.colors.error} />
              )}
              <StatusOrder>
                Pedido {item.status} - N° {item.id}
              </StatusOrder>
            </Row>
            <Divider />
            {item.status === 'entregue' && (
              <GlobalLink align="flex-end">Realizar troca/devolução</GlobalLink>
            )}
            {item.status === 'em troca/devolução' && (
              <GlobalLink align="flex-end">Produtos foram enviados</GlobalLink>
            )}
          </Card>
        ))}
      </Container>
    </GlobalContainer>
  );
};

export default History;
