import { Close, Warning } from '@/assets/icons';
import { Modal, Text, View } from 'react-native';
import { Container, Content, Description, IconWrapper, Title } from './styles';

interface IModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

const ModalWarning = ({ isOpen, title, description, onClose }: IModalProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Container>
        <Content>
          <Close style={{ alignSelf: 'flex-end' }} onPress={onClose} />
          <IconWrapper>
            <Warning />
          </IconWrapper>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Content>
      </Container>
    </Modal>
  );
};

export default ModalWarning;
