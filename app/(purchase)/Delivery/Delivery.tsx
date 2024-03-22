import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { router } from 'expo-router';
import { PinLight } from '@/assets/icons';
import { View } from 'react-native';
import { Button } from '@/components/Button/Button';
import { useState } from 'react';
import { shadow } from '@/global/shadow';
import { AddressText, Card, Container, IconWrapper } from './styles';

const Addresses = [
  {
    id: 'zxcvbn',
    street: 'Rua Valentin Faustino',
    number: '16',
    zipcode: '00000-000',
    city: 'Mogi das Cruzes',
    state: 'SP',
    selected: false,
  },
  {
    id: 'cvbnm',
    street: 'Rua Campos do Jordão',
    number: '185',
    zipcode: '08575-025',
    city: 'Itaquaquecetuba',
    state: 'SP',
    selected: false,
  },
];

const Delivery = () => {
  const handleSaveDelivery = () => {
    router.push('/Basket/');
  };

  const [saveAddresses, setSaveAddresses] = useState(Addresses);

  const handleSelectAddress = (address_id: string) => {
    const newAddress = Addresses.map(item => {
      if (item.id === address_id) {
        return {
          ...item,
          selected: !item.selected,
        };
      }
      return item;
    });
    setSaveAddresses(newAddress);
  };

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
                {item.street}, {item.number}, {item.zipcode}, {item.city} -{' '}
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
