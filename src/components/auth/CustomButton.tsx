import React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ICustomButton {
  title: string;
  onPress: (() => void) | undefined;
  styles: {
    wrapper: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
  };
}

const CustomButton = ({title, onPress, styles}: ICustomButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.wrapper,
        {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
