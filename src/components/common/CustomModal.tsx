import React, {useState} from 'react';
import {Modal, View} from 'react-native';

const CustomModal = ({children, setIsToastVisible}: any) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <Modal
      presentationStyle="formSheet"
      animationType="slide"
      // transparent={true}
      visible={isVisible}
      onRequestClose={() =>
        setTimeout(() => {
          setIsToastVisible(false);
          setIsVisible(false);
        }, 2100)
      }>
      {children}
    </Modal>
  );
};

export default CustomModal;
