import { GlobalLink, GlobalSubtitle, GlobalText } from '@/global/styles';
import { FlatList, View } from 'react-native';
import { Clock01, ClockCategories } from '@/assets/pictures';
import { formatCurrency } from '@/utils/format';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { api } from '@/services/api';
import { prettyLog } from '@/services/prettyLog';
import { handleError } from '@/utils/handleError';
import { Card, CardImage, Content, ItemsContainer, Row } from './styles';

export interface Products {
  id: string;
  name: string;
  price: string;
  stock: string;
  banner: string;
}

const Catalog = () => {
  const router = useRouter();

  const [products, setProducts] = useState<Products[]>([]);

  const handleGoTo = (product_id: string) => {
    router.push({
      pathname: '/ProductDetails/ProductDetails',
      params: { product_id },
    });
  };

  const getProducts = async () => {
    try {
      const response = await api.get(`product/all`);
      setProducts(response.data);
      prettyLog(products);
    } catch (error) {
      handleError('Não foi possível carregar os produtos');
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Content>
      <GlobalSubtitle>Catálogo</GlobalSubtitle>
      <ItemsContainer>
        {products.map(item => (
          <Card key={item.id} onPress={() => handleGoTo(item.id)}>
            <CardImage source={item.banner} contentFit="contain" />
            <Row>
              <GlobalText>{item.name}</GlobalText>
              <GlobalLink>{formatCurrency(parseFloat(item.price))}</GlobalLink>
            </Row>
          </Card>
        ))}
      </ItemsContainer>
    </Content>
  );
};

export default Catalog;
