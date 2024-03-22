import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle, GlobalText } from '@/global/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { shadow } from '@/global/shadow';
import { Pen, Plus, Trash } from '@/assets/icons';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Button } from '@/components/Button/Button';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import CreditCard from '@/components/CreditCard/CreditCard';
import { theme } from '@/global/theme';
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

  const [isLoading, setIsLoading] = useState(false);

  const handleNewCard = () => {
    router.push({
      pathname: '/NewCard/',
      params: { path: 'MyCards', card_id: 'false' },
    });
  };

  const getCards = async () => {
    setIsLoading(true);
    try {
      const response = await api.get(`user/cards`);
      setCards(response.data);
    } catch (error) {
      handleError('Não foi possível encontrar seus cartões, tente mais tarde.');
    } finally {
      setIsLoading(false);
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
        {isLoading ? (
          <ActivityIndicator color={theme.colors.primary_01} size={24} />
        ) : (
          <View>
            {cards.map(item => (
              <CreditCard item={item} key={item.id} />
            ))}
            {cards.length < 1 && (
              <GlobalText>Não há encontramos cartões cadastrado</GlobalText>
            )}
          </View>
        )}
      </Container>
    </GlobalContainer>
  );
};

export default MyCards;
