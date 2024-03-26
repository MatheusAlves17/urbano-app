import { useForm } from 'react-hook-form';
import { GlobalContainer, GlobalScrollView } from '@/global/styles';
import { ArrowDown, Bell, Pin, Search, User } from '@/assets/icons';
import Input from '@/components/Input/Input';
import { theme } from '@/global/theme';
import { Clock01 } from '@/assets/pictures';
import { View } from 'react-native';
import ListCategory from '@/components/ListCategory/ListCategory';
import Catalog from '@/components/Catalog/Catalog';
import { useAuth } from '@/hooks/useAuth';
import {
  AddressContainer,
  AddressLabel,
  AddressText,
  Content,
  Header,
  Highlight,
  HighlightTitle,
  HightlightImage,
  NotificationButton,
  Row,
} from './styles';

type FormData = {
  search: string;
};

const Home = () => {
  const { user } = useAuth();
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <GlobalScrollView>
      <GlobalContainer>
        <Header>
          <AddressContainer>
            <AddressLabel>Olá, seja bem-vindo</AddressLabel>
            <Row>
              <AddressText>{user.name}</AddressText>
            </Row>
          </AddressContainer>
          <NotificationButton>
            <Bell />
          </NotificationButton>
        </Header>
        <Content>
          <Input
            control={control}
            name="search"
            iconLeft={<Search />}
            placeholder="Buscar produtos..."
            containerStyle={{ backgroundColor: theme.colors.background }}
            onSubmitEditing={handleSubmit(onSubmit)}
          />
          <Highlight>
            <HightlightImage
              source={{
                uri: 'https://beco-back.onrender.com/files/5863b9e103244bd684ad2f18fbdd6891-relogio-azul.png',
              }}
              contentFit="contain"
            />
            <View>
              <AddressLabel>Destaque da semana</AddressLabel>
              <HighlightTitle>
                Relógio Technos Masculino Golf 2115laq/2c
              </HighlightTitle>
            </View>
          </Highlight>
          <ListCategory />
          <Catalog />
        </Content>
      </GlobalContainer>
    </GlobalScrollView>
  );
};

export default Home;
