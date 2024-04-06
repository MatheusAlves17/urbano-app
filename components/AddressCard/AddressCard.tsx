import { shadow } from '@/global/shadow';
import { CreditCardIcon, Pen, PinLight, Trash } from '@/assets/icons';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { theme } from '@/global/theme';
import { AddressText, Card, IconWrapper, Row } from './styles';

interface Address {
  id: string;
  zipCode: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  type?: string;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}

interface IAddressProps {
  item: Address;
  loading?: boolean;
  onDelete: (address_id: string) => void;
}

const AddressCard = ({ item, loading, onDelete }: IAddressProps) => {
  const handleEditCard = () => {
    router.push({
      pathname: '/NewAddress/NewAddress',
      params: { address_id: item.id, path: 'Addresses' },
    });
  };

  return (
    <Card style={{ ...shadow.default }} key={item.id}>
      <Row>
        <IconWrapper>
          <PinLight />
        </IconWrapper>
        <AddressText>
          {item.street}, {item.number}, {item.zipCode}, {item.city} -{' '}
          {item.state}
        </AddressText>
      </Row>
      <Row>
        <AddressText>{item.type}</AddressText>
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

export default AddressCard;
