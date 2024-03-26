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
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { prettyLog } from '@/services/prettyLog';
import { Container, EditButton, Row } from './styles';

export interface Card {
  id: string;
  number: string;
  cvv: string;
  validity: string;
  name: string;
  flag: string;
  principal: boolean;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

const MyCards = () => {
  const [cards, setCards] = useState<Card[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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
      prettyLog(cards);
    } catch (error) {
      handleError('Não foi possível encontrar seus cartões, tente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCard = async (card_id: string) => {
    setIsDeleteLoading(true);
    try {
      const response = await api.delete(`user/card?card_id=${card_id}`);
      setIsSuccess(true);
    } catch (error) {
      handleError('Falha ao excluir cartão de crédito, tente mais tarde.');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsSuccess(false);
    getCards();
  };

  useEffect(() => {
    getCards();
  }, []);

  return (
    <GlobalContainer>
      <Header onPress={() => router.push('/Settings/')} title="Cartões" />
      <Container>
        <Row>
          <GlobalSubtitle>Meus cartões</GlobalSubtitle>
          <EditButton onPress={handleNewCard}>
            <Plus />
          </EditButton>
        </Row>
        {isLoading ? (
          <ActivityIndicator color={theme.colors.primary_01} size={24} />
        ) : (
          <View>
            {cards.map(item => (
              <CreditCard
                item={item}
                key={item.id}
                onDelete={handleDeleteCard}
                loading={isDeleteLoading}
              />
            ))}
            {cards.length < 1 && (
              <GlobalText>Não há encontramos cartões cadastrado</GlobalText>
            )}
          </View>
        )}
      </Container>
      <ModalSuccess
        isOpen={isSuccess}
        title="Sucesso"
        description="Cartão excluído"
        isTransparent
        onClose={handleCloseModal}
      />
    </GlobalContainer>
  );
};

export default MyCards;
