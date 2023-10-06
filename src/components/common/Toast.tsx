import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {Animated} from 'react-native';

interface IToastProps {
  text: string;
  bottom: number;
  onClose: () => void;
  isWrapped: boolean;
}

const Toast = ({text, onClose, bottom, isWrapped}: IToastProps) => {
  const [isToastVisible, setIsToastVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsToastVisible(false);
      onClose();
    }, 2100);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();

    return () => clearTimeout(timer);
  }, []);

  return (
    <SToastContainer bottom={bottom} isWrapped={isWrapped}>
      {isToastVisible && (
        <SToastWrapper style={{opacity: fadeAnim}}>
          <SToastCopy>{text}</SToastCopy>
        </SToastWrapper>
      )}
    </SToastContainer>
  );
};

export default Toast;

const SToastContainer = styled.View<{bottom: number; isWrapped: boolean}>`
  width: 100%;
  height: auto;
  position: absolute;
  bottom: ${({bottom}) => bottom}px;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: transparent;
  padding: ${({isWrapped}) => (isWrapped ? 0 : '0 18px')};
`;

const SToastWrapper = styled(Animated.View)`
  background-color: ${({theme}) => theme.style.colors.toast};
  border-radius: 10px;
  padding: 18px;
`;

const SToastCopy = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.toastText};
`;
