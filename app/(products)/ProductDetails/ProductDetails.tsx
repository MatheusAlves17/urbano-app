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
import { useState } from 'react';
import { router } from 'expo-router';
import { StatusBar } from 'react-native';
import { theme } from '@/global/theme';
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StatusBar translucent backgroundColor={theme.colors.white_02} />
      <GlobalScrollView>
        <GlobalContainer>
          <Header
            title="Carrinho"
            styles={{ position: 'absolute', zIndex: 100 }}
            onPress={() => router.push('/Home/')}
          />
          <ImageContainer>
            <ImageProduct source={Clock01} contentFit="contain" />
          </ImageContainer>
          <Content>
            <Category>Relógios</Category>
            <Row>
              <Title>
                Relógio Saint Germain Bronx Rosé Gold 40mm Cor da correia Marrom
              </Title>
              <Price>R$ 150,00</Price>
            </Row>
            <GlobalLink>Descrição</GlobalLink>
            <GlobalText align="flex-start">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rem
              temporibus rerum dolore, id enim exercitationem eum officia ipsum
              sequi voluptatibus quas atque ipsa. Maxime non magni officia
              tempora voluptatem impedit.
            </GlobalText>
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
