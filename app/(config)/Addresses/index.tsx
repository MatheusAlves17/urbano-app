import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle, GlobalText } from '@/global/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { shadow } from '@/global/shadow';
import { Pen, PinLight, Plus, Trash } from '@/assets/icons';
import { TouchableOpacity } from 'react-native';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import {
  AddressText,
  Card,
  Container,
  EditButton,
  IconWrapper,
  Row,
} from './styles';

export interface MyAddress {
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

const Addresses = () => {
  const [address, setAddress] = useState<MyAddress[]>([]);

  const handleEditAddress = (address_id: string) => {
    router.push({
      pathname: '/NewAddress/NewAddress',
      params: { address_id, path: 'Addresses' },
    });
  };

  const getAddress = async () => {
    try {
      const response = await api.get(`user/all-address`);
      setAddress(response.data);
    } catch (error) {
      handleError('Não foi possível encontrar seus endereços');
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <GlobalContainer>
      <Header onPress={() => router.push('/Settings/')} title="Endereços" />
      <Container>
        <Row style={{ justifyContent: 'space-between' }}>
          <GlobalSubtitle>Meus endereços</GlobalSubtitle>
          <EditButton onPress={() => handleEditAddress('false')}>
            <Plus />
          </EditButton>
        </Row>
        {address.map(item => (
          <Card style={{ ...shadow.default }} key={item.id}>
            <Row>
              <IconWrapper>
                <PinLight />
              </IconWrapper>
              <AddressText>
                {item.street}, {item.number}, {item.zipCode}, {item.city} -{' '}
                {item.state}
              </AddressText>
              <AddressText>{item.type}</AddressText>
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
        {address.length === 0 && (
          <GlobalText>Não há endereços cadastrados</GlobalText>
        )}
      </Container>
    </GlobalContainer>
  );
};

export default Addresses;
