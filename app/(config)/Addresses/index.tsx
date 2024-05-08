import Header from '@/components/Header/Header';
import { GlobalContainer, GlobalSubtitle, GlobalText } from '@/global/styles';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { shadow } from '@/global/shadow';
import { Pen, PinLight, Plus, Trash } from '@/assets/icons';
import { TouchableOpacity } from 'react-native';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import AddressCard from '@/components/AddressCard/AddressCard';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { MyAddress } from '@/interfaces/Address';
import { prettyLog } from '@/services/prettyLog';
import {
  AddressText,
  Card,
  Container,
  EditButton,
  IconWrapper,
  Row,
} from './styles';

const Addresses = () => {
  const [address, setAddress] = useState<MyAddress[]>([]);
  prettyLog(address);

  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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

  const handleDeleteAddress = async (address_id: string) => {
    setIsDeleteLoading(true);
    try {
      const response = await api.delete(
        `user/address?address_id=${address_id}`,
      );
      setIsSuccess(true);
    } catch (error) {
      handleError('Falha ao excluir cartão de crédito, tente mais tarde.');
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsSuccess(false);
    getAddress();
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
          <AddressCard
            item={item}
            onDelete={handleDeleteAddress}
            key={item.id}
            loading={isDeleteLoading}
          />
        ))}
        {address.length === 0 && (
          <GlobalText>Não há endereços cadastrados</GlobalText>
        )}
      </Container>
      <ModalSuccess
        isOpen={isSuccess}
        title="Sucesso"
        description="Endereço excluído"
        isTransparent
        onClose={handleCloseModal}
      />
    </GlobalContainer>
  );
};

export default Addresses;
