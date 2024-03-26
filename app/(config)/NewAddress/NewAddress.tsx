import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { router, useLocalSearchParams } from 'expo-router';
import Input from '@/components/Input/Input';
import { useForm } from 'react-hook-form';
import { theme } from '@/global/theme';
import { Pin } from '@/assets/icons';
import { getAddressByCep } from '@/utils/getAddressByCep';
import { Button } from '@/components/Button/Button';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { useState } from 'react';
import { AddressForm, AddressSchema } from '@/validation/Address.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ScrollView } from 'react-native';
import { handleError } from '@/utils/handleError';
import { api } from '@/services/api';
import { Container } from './styles';

const NewAddress = () => {
  const { control, getValues, setValue, handleSubmit } = useForm<AddressForm>({
    resolver: yupResolver(AddressSchema),
  });

  const params = useLocalSearchParams();

  const { path, address_id } = params;

  const [isOpen, setIsOpen] = useState(false);

  const handleZipBlur = async () => {
    const data = await getAddressByCep(getValues('zipCode'));
    if (data) {
      setValue('street', data.logradouro, { shouldValidate: true });
      setValue('district', data.bairro, { shouldValidate: true });
      setValue('city', data.localidade, { shouldValidate: true });
      setValue('state', data.uf, { shouldValidate: true });
    }
  };

  const handleGoBack = () => {
    setIsOpen(false);
    switch (path) {
      case 'Delivery':
        router.push('/Delivery/Delivery');
        break;
      case 'Address':
        router.push('/Addresses/');
        break;
      default:
        router.push('/Addresses/');
        break;
    }
  };

  const onSubmit = async (dataForm: AddressForm) => {
    try {
      const response = await api.post(`user/address`, {
        street: dataForm.street,
        number: dataForm.number,
        district: dataForm.district,
        city: dataForm.city,
        state: dataForm.state,
        zipCode: dataForm.zipCode,
        type: dataForm.type,
      });
      setIsOpen(true);
      // handleGoBack();
    } catch (error) {
      handleError('Não foi possível salvar o endereço, tente mais tarde.');
    }
  };

  return (
    <GlobalContainer>
      <Header onPress={() => router.back()} title="Endereço" />
      <ScrollView
        style={{ width: '100%' }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Input
            label="CEP"
            control={control}
            type="zip-code"
            name="zipCode"
            placeholder="Informe o CEP"
            onBlur={handleZipBlur}
            onEndEditing={handleZipBlur}
            containerStyle={{ backgroundColor: theme.colors.background }}
            iconLeft={<Pin />}
          />
          <Input
            label="Rua"
            control={control}
            name="street"
            placeholder="Informe a rua"
            containerStyle={{ backgroundColor: theme.colors.background }}
            iconLeft={<Pin />}
          />
          <Input
            label="Número"
            control={control}
            name="number"
            placeholder="Informe o número"
            containerStyle={{ backgroundColor: theme.colors.background }}
            iconLeft={<Pin />}
            keyboardType="decimal-pad"
          />
          <Input
            label="Bairro"
            control={control}
            name="district"
            placeholder="Informe o bairro"
            containerStyle={{ backgroundColor: theme.colors.background }}
            iconLeft={<Pin />}
          />
          <Input
            label="Cidade"
            control={control}
            name="city"
            placeholder="Informe a cidade"
            containerStyle={{ backgroundColor: theme.colors.background }}
            iconLeft={<Pin />}
          />
          <Input
            label="Estado"
            control={control}
            name="state"
            placeholder="Informe o estado"
            containerStyle={{ backgroundColor: theme.colors.background }}
            iconLeft={<Pin />}
          />
          <Input
            label="Tipo de endereço"
            control={control}
            name="type"
            placeholder="Entrega/cobrança"
            containerStyle={{ backgroundColor: theme.colors.background }}
            iconLeft={<Pin />}
          />

          {address_id !== 'false' ? (
            <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 32 }}>
              Editar
            </Button>
          ) : (
            <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 32 }}>
              Salvar
            </Button>
          )}
        </Container>
      </ScrollView>
      <ModalSuccess
        isOpen={isOpen}
        title="Sucesso"
        description="Endereço foi salvo!"
        onClose={handleGoBack}
      />
    </GlobalContainer>
  );
};

export default NewAddress;
