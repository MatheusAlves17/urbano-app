import { GlobalLink, GlobalSubtitle, GlobalText } from '@/global/styles';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Clock01, ClockCategories } from '@/assets/pictures';
import { formatCurrency } from '@/utils/format';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { api, imageURL } from '@/services/api';
import { prettyLog } from '@/services/prettyLog';
import { handleError } from '@/utils/handleError';
import { theme } from '@/global/theme';
import { Card, CardImage, Content, ItemsContainer, Row } from './styles';

export interface Products {
  id: string;
  name: string;
  price: string;
  stock: string;
  banner: string;
  path: string;
}

const Catalog = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState<Products[]>([]);

  const handleGoTo = (product_id: string) => {
    router.push({
      pathname: '/ProductDetails/ProductDetails',
      params: { product_id },
    });
  };

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`product/all`);
      setProducts(response.data);
    } catch (error) {
      handleError('Não foi possível carregar os produtos');
    } finally {
      setIsLoading(false);
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
            <CardImage
              source={{
                uri: `${imageURL}${item.path}`,
              }}
              contentFit="contain"
            />
            <Row>
              <GlobalText>{item.name}</GlobalText>
              <GlobalLink>{formatCurrency(parseFloat(item.price))}</GlobalLink>
            </Row>
          </Card>
        ))}
        {products.length === 0 && !isLoading ? (
          <GlobalText>Não há produtos disponíveis</GlobalText>
        ) : null}
        {isLoading && (
          <ActivityIndicator color={theme.colors.primary_01} size={24} />
        )}
      </ItemsContainer>
    </Content>
  );
};

export default Catalog;
