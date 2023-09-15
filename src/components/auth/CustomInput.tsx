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
import styled from 'styled-components/native';
import {variables} from '~/styles/theme';

interface ICustomInput {
  name: string;
  placeholder: string;
  isValid: boolean;
  handleChange: (text: string, name: string) => void;
  secureTextEntry: boolean;
  returnKeyType: ReturnKeyType;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters';
}

const CustomInput = ({
  name,
  handleChange,
  isValid,
  ...others
}: ICustomInput) => {
  const [isFocused, setIsFocused] = useState(false);
  const theme = useThemeColors();

  return (
    <SInputWrapper isValid={isValid}>
      <STextInput
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
    </SInputWrapper>
  );
};

export default CustomInput;

const SInputWrapper = styled.View<{isValid: boolean}>`
  border-style: 'solid';
  border-bottom-width: 1px;
  margin: 10px 18px;
  border-bottom-color: ${({theme, isValid}) =>
    isValid ? theme.style.colors.primary : 'white'};
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;

const STextInput = styled.TextInput`
  flex-grow: 1;
  flex-shrink: 1;
  color: ${({theme}) => theme.style.colors.text};
  font-size: 16px;
  padding: 10px;
`;
