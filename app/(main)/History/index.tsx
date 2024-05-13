import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalLink, GlobalSubtitle } from '@/global/styles';
import { useRouter } from 'expo-router';
import { theme } from '@/global/theme';
import { Clock01 } from '@/assets/pictures';
import { shadow } from '@/global/shadow';
import { handleError, handleSuccess } from '@/utils/handleError';
import { api, imageURL } from '@/services/api';
import { useEffect, useState } from 'react';
import { prettyLog } from '@/services/prettyLog';
import { IOrders } from '@/interfaces/Orders';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import {
  CancelText,
  Card,
  Container,
  Divider,
  ImageItems,
  Row,
  StatusIndicator,
  StatusOrder,
} from './styles';

const History = () => {
  const [orders, setOrders] = useState<IOrders[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleGotoOrder = (order_id: string) => {
    router.push({ pathname: '/OrderDetails/', params: { order_id } });
  };

  const handleCancel = async (order_id: string) => {
    try {
      const response = await api.post(`order/cancel`, {
        order_id,
      });
      handleSuccess('Solicitação enviada, acompanhe na aba de cancelamento');
      handleGetOrders();
    } catch (error) {
      handleError('Falha em cancelar a compra, tente mais tarde');
    }
  };

  const handleSendingItems = async (item: IOrders) => {
    const items = item.item.map(product => product.id);

    try {
      const response = await api.post('item-sending', {
        order_id: item.id,
        items,
      });

      handleSuccess('Itens foram devolvidos com sucesso, aguarde...');
      handleGetOrders();
    } catch (error) {
      handleError(error);
    }
  };

  const handleGetOrders = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('order/all');

      setOrders(response.data);
      prettyLog(orders);
    } catch (error) {
      handleError('Não foi possível encontrar as compras, tente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <GlobalContainer>
      <Header onPress={() => router.back()} title="Pedidos" />
      {isLoading ? (
        <ActivityIndicator color={theme.colors.primary_01} size={24} />
      ) : (
        <Container>
          <GlobalSubtitle>Acompanhe seus pedidos</GlobalSubtitle>
          {orders.map(item => (
            <Card
              key={item.id}
              onPress={() =>
                item.status.name === 'Entregue' && handleGotoOrder(item.id)
              }
              style={{ ...shadow.default }}
            >
              <Row>
                {item.item.map(product => (
                  <ImageItems
                    source={`${imageURL}${product.banner}`}
                    key={product.id}
                  />
                ))}
              </Row>
              {/* <Row>
                {item.status.name === 'Em preparação' && (
                  <StatusIndicator status={theme.colors.warning_02} />
                )}
                {item.status.name === 'Entregue' && (
                  <StatusIndicator status={theme.colors.success} />
                )}
                {item.status.name === 'Em troca' && (
                  <StatusIndicator status={theme.colors.error} />
                )}
              </Row> */}
              <StatusOrder>Status: {item.status.name}</StatusOrder>
              {item.status.name !== 'Troca encerrada' ? (
                <View>
                  {item.status.name !== 'Cancelado' &&
                  item.status.name !== 'Itens devolvidos' ? (
                    <TouchableOpacity onPress={() => handleCancel(item.id)}>
                      <CancelText>Cancelar compra</CancelText>
                    </TouchableOpacity>
                  ) : null}
                </View>
              ) : null}
              {item.status.name === 'Cancelado' && (
                <TouchableOpacity onPress={() => handleSendingItems(item)}>
                  <CancelText>Devolver itens</CancelText>
                </TouchableOpacity>
              )}
            </Card>
          ))}
        </Container>
      )}
    </GlobalContainer>
  );
};

export default History;
