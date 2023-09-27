import React, {useState} from 'react';
import {ReturnKeyType} from 'react-native';
import useThemeColors from '~/hooks/useThemeColors';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

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
        color={isValid ? theme.colors.primary : theme.colors.gray}
      />
    </SInputWrapper>
  );
};

export default CustomInput;

const SInputWrapper = styled.View<{isValid: boolean}>`
  border-bottom-width: 1px;
  margin: 10px 18px;
  border-bottom-color: ${({theme, isValid}) =>
    isValid ? theme.style.colors.primary : theme.style.colors.gray};
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;

const STextInput = styled.TextInput`
  font-family: 'Poppins-Regular';
  flex-grow: 1;
  flex-shrink: 1;
  color: ${({theme}) => theme.style.colors.text};
  font-size: 14px;
  padding: 10px;
`;
