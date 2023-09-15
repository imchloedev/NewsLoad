import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  TextStyle,
  ReturnKeyType,
} from 'react-native';
import useThemeColors from '~/hooks/useThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';

interface ICustomInput {
  name: string;
  placeholder: string;
  isValid: boolean;
  styles: {
    wrapper: StyleProp<ViewStyle>;
    input: StyleProp<TextStyle>;
  };
  handleChange: (text: string, name: string) => void;
  secureTextEntry: boolean;
  returnKeyType: ReturnKeyType;
}

const CustomInput = ({
  name,
  handleChange,
  styles,
  isValid,
  ...others
}: ICustomInput) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useThemeColors();

  return (
    <View
      style={[
        styles.wrapper,
        {borderBottomColor: isValid ? theme.colors.primary : 'white'},
      ]}>
      <TextInput
        style={styles.input}
        autoCapitalize={'none'}
        onChangeText={txt => handleChange(txt, name)}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        {...others}
      />

      <Icon
        name="checkmark-outline"
        size={20}
        color={isValid ? theme.colors.primary : theme.colors.middleGray}
      />
    </View>
  );
};

export default CustomInput;
