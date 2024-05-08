import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { router } from 'expo-router';
import { PinLight } from '@/assets/icons';
import { View } from 'react-native';
import { Button } from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import { shadow } from '@/global/shadow';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import { MyAddress } from '@/interfaces/Address';
import { useCart } from '@/hooks/useCart';
import { AddressText, Card, Container, IconWrapper } from './styles';

const Delivery = () => {
  const { addDelivery } = useCart();
  const handleSaveDelivery = () => {
    router.push('/Basket/');
  };

  const [saveAddresses, setSaveAddresses] = useState<MyAddress[]>([]);

  const handleSelectAddress = (address_id: string) => {
    const newAddress = saveAddresses.map(item => {
      if (item.id === address_id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
    addDelivery(address_id);
    setSaveAddresses(newAddress);
  };

  const getAddress = async () => {
    try {
      const response = await api.get<MyAddress[]>('user/all-address');
      setSaveAddresses(response.data);
    } catch (error) {
      handleError('Não foi possível encontrar os endereços salvos');
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <GlobalContainer>
      <Header onPress={() => router.push('/Basket/')} title="Endereços" />
      <Container>
        {saveAddresses.map(item => (
          <Card
            style={{ ...shadow.default }}
            isSelected={item.selected}
            key={item.id}
            onPress={() => handleSelectAddress(item.id)}
          >
            <IconWrapper isSelected={false}>
              <PinLight />
            </IconWrapper>
            <View>
              <AddressText>
                {item.street}, {item.number}, {item.zipCode}, {item.city} -{' '}
                {item.state}
              </AddressText>
            </View>
          </Card>
        ))}
        <Button style={{ marginTop: 32 }} onPress={handleSaveDelivery}>
          Salvar endereço de entrega
        </Button>
        <Button isOutline onPress={() => router.push('/NewAddress/NewAddress')}>
          Novo endereço de entrega
        </Button>
      </Container>
    </GlobalContainer>
  );
};

export default Delivery;
