import React, {useEffect, useRef} from 'react';
import styled from 'styled-components/native';
import {Animated} from 'react-native';

interface IToastProps {
  text: string;
  visible?: boolean;
  setVisible?: () => void;
}

const Toast = ({text}: IToastProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <SToastContainer style={{opacity: fadeAnim}}>
      <SToastWrapper>
        <SToastCopy>{text}</SToastCopy>
      </SToastWrapper>
    </SToastContainer>
  );
};

export default Toast;

const SToastContainer = styled(Animated.View)`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: transparent;
`;

const SToastWrapper = styled.View`
  margin: 0 18px;
  background-color: ${({theme}) => theme.style.colors.toast};
  border-radius: 10px;
  padding: 18px;
`;

const SToastCopy = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.toastText};
`;
