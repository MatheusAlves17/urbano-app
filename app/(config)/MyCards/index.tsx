import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle, GlobalText } from '@/global/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { shadow } from '@/global/shadow';
import { Pen, Plus, Trash } from '@/assets/icons';
import { TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/Button/Button';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import CreditCard from '@/components/CreditCard/CreditCard';
import { Container, EditButton, Row } from './styles';

export interface Card {
  id: string;
  number: string;
  cvv: string;
  validity: string;
  name: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

const MyCards = () => {
  const [cards, setCards] = useState<Card[]>([]);

  const handleNewCard = () => {
    router.push({
      pathname: '/NewCard/',
      params: { path: 'MyCards' },
    });
  };

  const getCards = async () => {
    try {
      const response = await api.get(`user/cards`);
      setCards(response.data);
    } catch (error) {
      handleError('Não foi possível encontrar seus cartões, tente mais tarde.');
    }
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <GlobalContainer>
      <Header onPress={() => router.push('/Settings/')} title="Endereços" />
      <Container>
        <Row>
          <GlobalSubtitle>Seus enderços</GlobalSubtitle>
          <EditButton onPress={handleNewCard}>
            <Plus />
          </EditButton>
        </Row>
        {cards.map(item => (
          <CreditCard item={item} />
        ))}
        {cards.length < 1 && (
          <GlobalText>Não há encontramos cartões cadastrado</GlobalText>
        )}
      </Container>
    </GlobalContainer>
  );
};

export default MyCards;
