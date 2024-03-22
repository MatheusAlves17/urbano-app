import { GlobalLink, GlobalSubtitle, GlobalText } from '@/global/styles';
import { FlatList, View } from 'react-native';
import { Clock01, ClockCategories } from '@/assets/pictures';
import { formatCurrency } from '@/utils/format';
import { useRouter } from 'expo-router';
import { Card, CardImage, Content, ItemsContainer, Row } from './styles';

const Products = [
  {
    id: 'asfhb',
    title: 'Relógio de couro',
    price: 1200,
    image: Clock01,
  },
  {
    id: 'vbnm',
    title: 'Relógio preto',
    price: 2500,
    image: Clock01,
  },
  {
    id: 'uihnm',
    title: 'Relógio de couro',
    price: 1200,
    image: Clock01,
  },
  {
    id: 'yuio',
    title: 'Relógio preto',
    price: 2500,
    image: Clock01,
  },
];

const Catalog = () => {
  const router = useRouter();

  const handleGoTo = (product_id: string) => {
    router.push({
      pathname: '/ProductDetails/ProductDetails',
      params: { product_id },
    });
  };

  return (
    <Content>
      <GlobalSubtitle>Catálogo</GlobalSubtitle>
      <ItemsContainer>
        {Products.map(item => (
          <Card key={item.id} onPress={() => handleGoTo(item.id)}>
            <CardImage source={item.image} contentFit="contain" />
            <Row>
              <GlobalText>{item.title}</GlobalText>
              <GlobalLink>{formatCurrency(item.price)}</GlobalLink>
            </Row>
          </Card>
        ))}
      </ItemsContainer>
    </Content>
  );
};

export default Catalog;
