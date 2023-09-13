import React from 'react';
import {styled} from 'styled-components/native';

interface CustomButton {
  title: string;
  onPress: (query?: string) => void;
  styles: React.CSSProperties;
}

const CustomButton = ({title, onPress, styles}: CustomButton) => {
  return (
    <SCustomBtn onPress={() => onPress} styles={styles}>
      <SCustomBtnCopy>{title}</SCustomBtnCopy>
    </SCustomBtn>
  );
};

export default CustomButton;

const SCustomBtn = styled.TouchableOpacity<{styles: React.CSSProperties}>`
  border-radius: 20px;
  height: ${({styles}) => styles.height};
  width: ${({styles}) => styles.width};
  background-color: ${({theme}) => theme.style.colors.primary};
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SCustomBtnCopy = styled.Text`
  color: ${({theme}) => theme.style.colors.white};
`;
