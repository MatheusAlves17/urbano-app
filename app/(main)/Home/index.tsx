import { useForm } from 'react-hook-form';
import { GlobalContainer, GlobalScrollView } from '@/global/styles';
import { ArrowDown, Bell, Pin, Search } from '@/assets/icons';
import Input from '@/components/Input/Input';
import { theme } from '@/global/theme';
import { Clock01 } from '@/assets/pictures';
import { View } from 'react-native';
import ListCategory from '@/components/ListCategory/ListCategory';
import Catalog from '@/components/Catalog/Catalog';
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
            <AddressLabel>Endereço de entrega</AddressLabel>
            <Row>
              <Pin />
              <AddressText>Mogi das Cruzes</AddressText>
              <ArrowDown />
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
            <HightlightImage source={Clock01} contentFit="contain" />
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
