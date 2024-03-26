import Header from '@/components/Header/Header';
import {
  GlobalContainer,
  GlobalLink,
  GlobalScrollView,
  GlobalText,
} from '@/global/styles';
import { Clock01 } from '@/assets/pictures';
import { Button } from '@/components/Button/Button';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'react-native';
import { theme } from '@/global/theme';
import { handleError } from '@/utils/handleError';
import { api, imageURL } from '@/services/api';
import { formatCurrency } from '@/utils/format';
import {
  Category,
  Content,
  ImageContainer,
  ImageProduct,
  Price,
  Row,
  Title,
} from './styles';

export interface Product {
  id: string;
  name: string;
  price: string;
  stock: string;
  category: Category;
  banner: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

const ProductDetails = () => {
  const params = useLocalSearchParams();
  const { product_id } = params;

  const [isOpen, setIsOpen] = useState(false);

  const [product, setProduct] = useState<Product>();

  const getProduct = async () => {
    try {
      const response = await api.get(`product/one?product_id=${product_id}`);
      setProduct(response.data);
    } catch (error) {
      handleError('Produto indisponível no momento, tente mais tarde');
    }
  };

  useEffect(() => {
    getProduct();
  }, [product_id]);

  return (
    <>
      <StatusBar translucent backgroundColor={theme.colors.white_02} />
      <GlobalScrollView>
        <GlobalContainer>
          <Header
            title="Detalhes do produto"
            styles={{ position: 'absolute', zIndex: 100 }}
            onPress={() => router.push('/Home/')}
          />
          <ImageContainer>
            <ImageProduct
              source={{ uri: `${imageURL}${product?.banner}` }}
              contentFit="contain"
            />
          </ImageContainer>
          <Content>
            <Category>{product?.category.name}</Category>
            <Row>
              <Title>{product?.name}</Title>
              <Price>
                {product?.price && formatCurrency(parseFloat(product?.price))}
              </Price>
            </Row>
            <GlobalLink>Descrição</GlobalLink>
            <GlobalText align="flex-start">{product?.description}</GlobalText>

            <Button style={{ marginTop: 56 }} onPress={() => setIsOpen(true)}>
              Adicionar produto
            </Button>
          </Content>
        </GlobalContainer>
        <ModalSuccess
          isOpen={isOpen}
          isTransparent
          title="Sucesso!"
          description="Seu produto foi adicionado à sua cesta"
          onClose={() => setIsOpen(false)}
        />
      </GlobalScrollView>
    </>
  );
};

export default ProductDetails;
