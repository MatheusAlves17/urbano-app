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
import { Container } from './styles';

const NewAddress = () => {
  const { control, getValues, setValue, handleSubmit } = useForm({
    // resolver: yupResolver(SignupSchema),
  });

  const params = useLocalSearchParams();

  const { path } = params;

  const [isOpen, setIsOpen] = useState(false);

  const handleZipBlur = async () => {
    const data = await getAddressByCep(getValues('zipcode'));
    if (data) {
      setValue('street', data.logradouro, { shouldValidate: true });
      setValue('district', data.bairro, { shouldValidate: true });
      setValue('city', data.localidade, { shouldValidate: true });
      setValue('state', data.uf, { shouldValidate: true });
    }
  };

  const handleGoBack = () => {
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

  const onSubmit = () => {
    handleGoBack();
  };

  return (
    <GlobalContainer>
      <Header onPress={() => router.back()} title="Endereço" />
      <Container>
        <Input
          label="CEP"
          control={control}
          type="zip-code"
          name="zipcode"
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
        <Button onPress={handleSubmit(onSubmit)} style={{ marginTop: 32 }}>
          Salvar
        </Button>
      </Container>
      <ModalSuccess
        isOpen={isOpen}
        title="Sucesso"
        description="Endereço foi salvo!"
        onClose={() => setIsOpen(false)}
      />
    </GlobalContainer>
  );
};

export default NewAddress;
