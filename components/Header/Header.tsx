import { ArrowLeft } from '@/assets/icons';
import { shadow } from '@/global/shadow';
import { useRouter } from 'expo-router';
import { ViewStyle } from 'react-native';
import { ButtonBack, Container, Title, TitleWrapper } from './styles';

interface IHeaderProps {
  title?: string;
  onPress?: () => void;
  styles?: ViewStyle;
}

const Header = ({ title, onPress, styles }: IHeaderProps) => {
  const router = useRouter();

  return (
    <Container style={styles}>
      <ButtonBack onPress={onPress}>
        <ArrowLeft />
      </ButtonBack>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </Container>
  );
};

export default Header;
