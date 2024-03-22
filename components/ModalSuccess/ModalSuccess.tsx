import { Close, Success } from '@/assets/icons';
import { Modal } from 'react-native';
import { Container, Content, Description, IconWrapper, Title } from './styles';

interface IModalProps {
  isOpen: boolean;
  isTransparent?: boolean;
  title: string;
  description: string;
  onClose: () => void;
}

const ModalSuccess = ({
  isOpen,
  isTransparent,
  title,
  description,
  onClose,
}: IModalProps) => {
  return (
    <Modal
      visible={isOpen}
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Container
        style={{
          backgroundColor: isTransparent
            ? 'rgba(156, 158, 161, 0.7)'
            : 'rgba(156, 158, 161, 1)',
        }}
      >
        <Content>
          <Close style={{ alignSelf: 'flex-end' }} onPress={onClose} />
          <IconWrapper>
            <Success />
          </IconWrapper>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </Content>
      </Container>
    </Modal>
  );
};

export default ModalSuccess;
