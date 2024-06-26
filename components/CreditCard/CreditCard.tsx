import { shadow } from '@/global/shadow';
import { CreditCardIcon, Pen, Trash } from '@/assets/icons';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/global/theme';
import {
  Card,
  CardNumber,
  HideNumber,
  IconWrapper,
  MaskNumber,
  Row,
} from './styles';

interface Card {
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

interface ICreditCardProps {
  item: Card;
  loading?: boolean;
  onDelete: (card_id: string) => void;
}

const CreditCard = ({ item, loading, onDelete }: ICreditCardProps) => {
  const handleEditCard = () => {
    router.push({
      pathname: '/NewCard/',
      params: { card_id: item.id, path: 'MyCards' },
    });
  };

  return (
    <Card style={{ ...shadow.default }} key={item.id}>
      {/* <Row> */}
      <IconWrapper>
        <CreditCardIcon />
      </IconWrapper>
      {/* </Row> */}
      <CardNumber>{item.number}</CardNumber>
      <Row>
        <CardNumber style={{ alignSelf: 'center' }}>{item.name}</CardNumber>
        <TouchableOpacity onPress={handleEditCard}>
          <IconWrapper>
            <Pen />
          </IconWrapper>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <IconWrapper>
            {loading ? (
              <ActivityIndicator color={theme.colors.primary_01} size={20} />
            ) : (
              <Trash />
            )}
          </IconWrapper>
        </TouchableOpacity>
      </Row>
    </Card>
  );
};

export default CreditCard;
