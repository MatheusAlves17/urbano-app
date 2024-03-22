import { GlobalContainer } from '@/global/styles';
import { ScrollView, TouchableOpacity } from 'react-native';
import { Close } from '@/assets/icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import ModalWarning from '@/components/ModalWarning/ModalWarning';
import { Button } from '@/components/Button/Button';
import ModalSuccess from '@/components/ModalSuccess/ModalSuccess';
import { useForm } from 'react-hook-form';
import { Header, Text, Title } from './styles';

const Terms = () => {
  const router = useRouter();

  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(SignupSchema),
  });

  const [isOpen, setIsOpen] = useState(false);

  const [isOpenSuccess, setIsOpenSuccess] = useState(false);

  const handleGoBack = () => {
    setIsOpen(true);
  };

  const onSubmit = () => {
    setIsOpenSuccess(true);
  };

  return (
    <>
      <GlobalContainer>
        <Header>
          <Title>Termos de uso{'\n'}e políticas de privacidade</Title>
          <TouchableOpacity onPress={handleGoBack}>
            <Close />
          </TouchableOpacity>
        </Header>
        <ScrollView style={{ paddingHorizontal: 8, marginBottom: 20 }}>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
            sagittis neque eget elit auctor dapibus. Nulla vel aliquet neque.
            Nam egestas dignissim porttitor. Nam eget massa non sem viverra
            tincidunt auctor vel tortor. Quisque congue elementum convallis.
            Suspendisse quam libero, euismod vitae ullamcorper non, fringilla
            quis metus. Nunc non lectus lectus. Cras metus nibh, aliquet at
            cursus et, rhoncus vel leo. Vivamus mollis at erat quis semper.
            {'\n'}
            {'\n'}
            Integer luctus, sem vel sodales vulputate, diam risus condimentum
            diam, sed elementum ex ante at tortor. Phasellus et purus leo. Morbi
            venenatis massa sit amet sapien sodales, ut sollicitudin risus
            consectetur.
            {'\n'}
            {'\n'}
            Nam placerat non lectus vitae lacinia. Sed lacinia, lacus eget
            interdum eleifend, magna leo lacinia erat, a accumsan mi nulla
            tempus nibh. Duis eget fringilla elit, non sodales felis. Sed
            aliquet sem sed enim aliquet, sed aliquam urna elementum. Nulla et
            ornare sem, vitae commodo sapien. Etiam efficitur felis metus.
            Praesent convallis orci ac feugiat laoreet.
            {'\n'}
            {'\n'}
            Duis euismod semper elit, et pharetra mi tincidunt vitae. Nam
            gravida dolor non dolor molestie ultricies. Proin ac pretium elit.
            Phasellus purus dolor, convallis ut rutrum vel, semper a odio.
            Praesent imperdiet leo sit amet hendrerit bibendum. Pellentesque sed
            venenatis ante. Nunc eu orci in enim viverra imperdiet. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Aenean sagittis neque
            eget elit auctor dapibus. Nulla vel aliquet neque. Nam egestas
            dignissim porttitor. Nam eget massa non sem viverra tincidunt auctor
            vel tortor. Quisque congue elementum convallis. Suspendisse quam
            libero, euismod vitae ullamcorper non, fringilla quis metus. Nunc
            non lectus lectus. Cras metus nibh, aliquet at cursus et, rhoncus
            vel leo. Vivamus mollis at erat quis semper.
            {'\n'}
            {'\n'}
            Integer luctus, sem vel sodales vulputate, diam risus condimentum
            diam, sed elementum ex ante at tortor. Phasellus et purus leo. Morbi
            venenatis massa sit amet sapien sodales, ut sollicitudin risus
            consectetur.
            {'\n'}
            {'\n'}
            Nam placerat non lectus vitae lacinia. Sed lacinia, lacus eget
            interdum eleifend, magna leo lacinia erat, a accumsan mi nulla
            tempus nibh. Duis eget fringilla elit, non sodales felis. Sed
            aliquet sem sed enim aliquet, sed aliquam urna elementum. Nulla et
            ornare sem, vitae commodo sapien. Etiam efficitur felis metus.
            Praesent convallis orci ac feugiat laoreet.
            {'\n'}
            {'\n'}
            Duis euismod semper elit, et pharetra mi tincidunt vitae. Nam
            gravida dolor non dolor molestie ultricies. Proin ac pretium elit.
            Phasellus purus dolor, convallis ut rutrum vel, semper a odio.
            Praesent imperdiet leo sit amet hendrerit bibendum. Pellentesque sed
            venenatis ante. Nunc eu orci in enim viverra imperdiet.
          </Text>
        </ScrollView>
        <Button onPress={handleSubmit(onSubmit)}>Aceitar os termos</Button>
      </GlobalContainer>
      <ModalWarning
        isOpen={isOpen}
        title="Atenção!"
        description="Aceite os termos para prosseguir"
        onClose={() => setIsOpen(false)}
      />
      <ModalSuccess
        isOpen={isOpenSuccess}
        title="Sucesso!"
        description="Cadastro feito com sucesso!"
        onClose={() => router.push('/(main)/Home/')}
      />
    </>
  );
};

export default Terms;
