import styled from 'styled-components/native';

interface ICheckboxProps {
  isChecked?: boolean;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  margin-top: 16px;
`;

export const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CheckboxContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Checkbox = styled.TouchableOpacity<ICheckboxProps>`
  width: 25px;
  height: 25px;

  align-items: center;
  justify-content: center;
  margin-right: 8px;

  border-radius: 8px;
  border: 1px solid
    ${({ isChecked, theme }) =>
      isChecked ? theme.colors.background : theme.colors.primary_01};

  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.colors.primary_01 : theme.colors.background};
`;
