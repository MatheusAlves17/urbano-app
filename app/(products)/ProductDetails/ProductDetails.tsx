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
import { handleError, handleSuccess } from '@/utils/handleError';
import { api, imageURL } from '@/services/api';
import { formatCurrency } from '@/utils/format';
import { useCart } from '@/hooks/useCart';
import { IProduct } from '@/interfaces/Product';
import {
  Category,
  Content,
  ImageContainer,
  ImageProduct,
  Price,
  Row,
  Title,
} from './styles';

const ProductDetails = () => {
  const params = useLocalSearchParams();
  const { product_id } = params;

  const { addToCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const [product, setProduct] = useState<IProduct>();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      handleSuccess('Adicionado ao carrinho');
      // setIsOpen(true);
    }
  };

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
              source={{ uri: `${imageURL}${product?.path}` }}
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

            <Button style={{ marginTop: 56 }} onPress={handleAddToCart}>
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
