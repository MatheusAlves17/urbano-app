import Header from '@/components/Header/Header';
import {
  GlobalContainer,
  GlobalScrollView,
  GlobalSubtitle,
  GlobalTitle,
} from '@/global/styles';
import { Clock01 } from '@/assets/pictures';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { ArrowDown, ArrowLeft, Less, Plus } from '@/assets/icons';
import { useRef, useState } from 'react';
import Summary from '@/components/Summary/Summary';
import { height, width } from '@/global/constants';
import BottomSheet from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import {
  ActionsRow,
  CardContainer,
  CardPrice,
  CardQuantity,
  CardTitle,
  Content,
  ImageContainer,
  ProductImage,
} from './styles';

const Basket = () => {
  const [count, setCount] = useState(1);
  const summaryRef = useRef<BottomSheet | null>(null);

  const handleOpenForm = () => {
    summaryRef.current?.expand();
  };

  const handleCloseForm = () => {
    summaryRef.current?.snapToIndex(0);
  };

  return (
    <GlobalContainer>
      <Header title="Cesta de produtos" onPress={() => router.back()} />
      <Content>
        <GlobalSubtitle>Itens adicionados</GlobalSubtitle>
        <CardContainer>
          <ImageContainer>
            <ProductImage source={Clock01} contentFit="contain" />
          </ImageContainer>
          <View style={{ width: '70%' }}>
            <CardTitle>Relógio Saint Germain Bronx</CardTitle>
            <CardPrice>R$ {(count * 148.9).toFixed(2)}</CardPrice>
          </View>
          <ActionsRow>
            <TouchableOpacity
              onPress={() => {
                count >= 1 && setCount(count - 1);
              }}
            >
              <Less />
            </TouchableOpacity>
            <CardQuantity>{count}</CardQuantity>
            <TouchableOpacity onPress={() => setCount(count + 1)}>
              <Plus />
            </TouchableOpacity>
          </ActionsRow>
        </CardContainer>
      </Content>
      <ArrowDown onPress={handleOpenForm} />
      <Summary ref={summaryRef} onClose={handleCloseForm} />
    </GlobalContainer>
  );
};

export default Basket;
