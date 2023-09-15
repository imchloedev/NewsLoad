import React from 'react';
import styled from 'styled-components/native';

interface ICustomButton {
  active?: boolean;
  title: string;
  onPress: (() => void) | undefined;
}

const CustomButton = ({title, onPress, active = true}: ICustomButton) => {
  return (
    <SButtonWrapper onPress={onPress} active={active}>
      <SButtonText active={active}>{title}</SButtonText>
    </SButtonWrapper>
  );
};

export default CustomButton;

const SButtonWrapper = styled.TouchableOpacity<{active: boolean}>`
  background-color: ${({theme, active}) =>
    active ? theme.style.colors.primary : theme.style.colors.white};
  height: 44px;
  border-radius: 20px;
  margin: 0 18px;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;

const SButtonText = styled.Text<{active: boolean}>`
  font-size: 16px;
  color: ${({theme, active}) =>
    active ? theme.style.colors.white : theme.style.colors.middleGray};
`;
