import { shadow } from '@/global/shadow';
import { CreditCardIcon, Pen, Trash } from '@/assets/icons';
import { TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
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
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

interface ICreditCardProps {
  item: Card;
}

const CreditCard = ({ item }: ICreditCardProps) => {
  const handleEditCard = () => {
    router.push({
      pathname: '/NewCard/',
      params: { card_id: item.id, path: 'MyCards' },
    });
  };

  return (
    <Card style={{ ...shadow.default }} key={item.id}>
      <Row>
        <IconWrapper>
          <CreditCardIcon />
        </IconWrapper>
        <View>
          <View style={{ flexDirection: 'row' }}>
            {/* <HideNumber>
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
          </HideNumber> */}
            <CardNumber>{item.number}</CardNumber>
          </View>
          <CardNumber>{item.name}</CardNumber>
        </View>
      </Row>
      <Row style={{ alignSelf: 'flex-end' }}>
        <TouchableOpacity onPress={handleEditCard}>
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
  );
};

export default CreditCard;
