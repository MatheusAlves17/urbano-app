import { Clock01 } from '@/assets/pictures';
import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle } from '@/global/styles';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@/utils/format';
import { Button } from '@/components/Button/Button';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { shadow } from '@/global/shadow';
import { IItems } from '@/interfaces/Items';
import { handleError, handleSuccess } from '@/utils/handleError';
import { api, imageURL } from '@/services/api';
import { prettyLog } from '@/services/prettyLog';
import { View } from 'react-native';
import { Card, CardName, CardPrice, Container, ImageItems } from './styles';

const OrderDetails = () => {
  const [isOpen, setIsOpen] = useState(false);

  const params = useLocalSearchParams();
  const { order_id } = params;

  const [productsItem, setProductsItems] = useState<IItems[]>([]);

  const handleGoBack = () => {
    setIsOpen(false);
    router.push('/History/');
  };

  const handleExchangeProducts = async () => {
    const itemsToExchange = productsItem
      .filter(item => item.selected === true)
      .map(item => item.id);

    console.log(itemsToExchange);

    try {
      const response = await api.put('item-exchange', {
        items: itemsToExchange,
        order_id,
      });
      console.log(response.data);

      handleSuccess('Solicitação enviada, acompanhe na aba de trocas');
      getOrders();
    } catch (error) {
      prettyLog(error);
      handleError('Erro ao devolver item, tente mais tarde.');
    }
  };

  const getOrders = async () => {
    try {
      const response = await api.get(`items?order_id=${order_id}`);
      setProductsItems(response.data);
    } catch (error) {
      handleError('Não foi possível encontar os itens, tente mais tarde.');
    }
  };

  const handleSelectItems = (item_id: string) => {
    const newItems = productsItem.map(item => {
      if (item_id === item.id) {
        return {
          ...item,
          selected: !item.selected,
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
      <Container showsVerticalScrollIndicator={false}>
        <GlobalSubtitle>Selecione os itens para devolução</GlobalSubtitle>
        {productsItem.map(item => (
          <Card
            style={{ ...shadow.default }}
            key={item.id}
            isSelected={item?.selected}
            onPress={() => handleSelectItems(item.id)}
          >
            <ImageItems source={`${imageURL}${item.banner}`} />
            <View>
              <CardName>{item?.name}</CardName>
              {item.status && <CardName>{item?.status.name}</CardName>}
            </View>
            <CardPrice>{formatCurrency(parseFloat(item?.price))}</CardPrice>
          </Card>
        ))}
        <Button style={{ marginTop: 40 }} onPress={handleExchangeProducts}>
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
