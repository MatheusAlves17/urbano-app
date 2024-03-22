import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle } from '@/global/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { shadow } from '@/global/shadow';
import { CreditCard, Pen, Trash } from '@/assets/icons';
import { TouchableOpacity, View } from 'react-native';
import {
  Card,
  CardNumber,
  Container,
  HideNumber,
  IconWrapper,
  MaskNumber,
  Row,
} from './styles';

const DataCard = [
  {
    id: 'f31c4',
    last_numbers: '5010',
    name: 'Rodrigo Gonçalves',
  },

  {
    id: 'f3lc4',
    last_numbers: '5089',
    name: 'Rodrigo Gonçalves',
  },
  {
    id: '4c13f',
    last_numbers: '7980',
    name: 'Rodrigo Gonçalves',
  },
];

const MyCards = () => {
  const [cards, setCards] = useState(DataCard);

  const handleEditAddress = (address_id: string) => {
    router.push({
      pathname: '/NewCard/',
      params: { address_id, path: 'Addresses' },
    });
  };

  const getAddress = () => {
    // faz a busca dos endereços, se não tiver redireciona
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <GlobalContainer>
      <Header onPress={() => router.push('/Settings/')} title="Endereços" />
      <Container>
        <GlobalSubtitle>Seus endereços</GlobalSubtitle>
        {cards.map(item => (
          <Card style={{ ...shadow.default }} key={item.id}>
            <Row>
              <IconWrapper>
                <CreditCard />
              </IconWrapper>
              <View style={{ flexDirection: 'row' }}>
                <HideNumber>
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                </HideNumber>
                <HideNumber>
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                </HideNumber>
                <HideNumber>
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                  <MaskNumber />
                </HideNumber>
                <CardNumber>{item.last_numbers}</CardNumber>
              </View>
            </Row>
            <Row style={{ alignSelf: 'flex-end' }}>
              <TouchableOpacity onPress={() => handleEditAddress(item.id)}>
                <IconWrapper>
                  <Pen />
                </IconWrapper>
              </TouchableOpacity>
              <TouchableOpacity>
                <IconWrapper>
                  <Trash />
                </IconWrapper>
              </TouchableOpacity>
            </Row>
          </Card>
        ))}
      </Container>
    </GlobalContainer>
  );
};

export default MyCards;
