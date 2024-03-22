import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle } from '@/global/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { shadow } from '@/global/shadow';
import { Pen, PinLight, Trash } from '@/assets/icons';
import { TouchableOpacity } from 'react-native';
import { AddressText, Card, Container, IconWrapper, Row } from './styles';

const myAddress = [
  {
    id: '1',
    street: 'Rua Valentim Faustini',
    number: '16',
    district: 'Braz Cubas',
    city: 'Mogi das Cruzes',
    zipcode: '00000-000',
    state: 'Sp',
  },
  {
    id: '2',
    street: 'Rua Jornalista Cândido Motta Filho',
    number: '16',
    district: 'Presidente Dutra',
    city: 'Ribeirão Preto',
    zipcode: '14060-760',
    state: 'Sp',
  },
];

const Addresses = () => {
  const [address, setAddress] = useState(myAddress);

  const handleEditAddress = (address_id: string) => {
    router.push({
      pathname: '/NewAddress/NewAddress',
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
        {address.map(item => (
          <Card style={{ ...shadow.default }} key={item.id}>
            <Row>
              <IconWrapper>
                <PinLight />
              </IconWrapper>
              <AddressText>
                {item.street}, {item.number}, {item.zipcode}, {item.city} -{' '}
                {item.state}
              </AddressText>
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

export default Addresses;
