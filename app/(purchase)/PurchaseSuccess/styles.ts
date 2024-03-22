import { width } from '@/global/constants';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  /* background-color: ${({ theme }) => theme.colors.white_02}; */
`;

export const MessageContainer = styled.View`
  width: 100%;
  height: 400px;
  border-radius: 16px;

  background-color: ${({ theme }) => theme.colors.white_02};
`;
