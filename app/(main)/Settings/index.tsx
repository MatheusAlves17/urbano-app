import { CreditCard, Lock, Logout, PinLight, User } from '@/assets/icons';
import Header from '@/components/Header/Header';
import { GlobalContainer } from '@/global/styles';
import { router } from 'expo-router';
import { shadow } from '@/global/shadow';
import { useAuth } from '@/hooks/useAuth';
import { Card, Container, IconWrapper, MenuTitle } from './styles';

const MenuItems = [
  {
    id: '1',
    title: 'Meu perfil',
    icon: <User />,
  },
  {
    id: '2',
    title: 'Editar senha',
    icon: <Lock />,
  },
  {
    id: '3',
    title: 'Meus cartões',
    icon: <CreditCard />,
  },
  {
    id: '4',
    title: 'Meus endereços',
    icon: <PinLight />,
  },
  {
    id: '5',
    title: 'Sair',
    icon: <Logout />,
  },
];

const Settings = () => {
  const { logout } = useAuth();

  const handleGoTo = (path: string) => {
    switch (path) {
      case 'Meu perfil':
        router.push('/Profile/');
        break;

      case 'Editar senha':
        router.push('/EditPassword/');
        break;
      case 'Meus cartões':
        router.push('/MyCards/');
        break;
      case 'Meus endereços':
        router.push('/Addresses/');
        break;
      case 'Sair':
        handleLogout();
        break;
      default:
        return true;
        break;
    }
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <GlobalContainer>
      <Header onPress={() => router.push('/Home/')} title="Configurações" />
      <Container>
        {MenuItems.map(item => (
          <Card key={item.id} onPress={() => handleGoTo(item.title)}>
            <IconWrapper style={{ ...shadow.default }}>{item.icon}</IconWrapper>
            <MenuTitle>{item.title}</MenuTitle>
          </Card>
        ))}
      </Container>
    </GlobalContainer>
  );
};

export default Settings;
