import React from 'react';
import {NativeSyntheticEvent, View, NativeTouchEvent} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ISearchInput {
  onPressIn?: () => void;
  onChangeText?: any;
  autoFocus?: boolean;
  autoCapitalize?: any;
}

const SearchInput = ({onPressIn, ...others}: ISearchInput) => {
  return (
    <SInputWrapper>
      <Icon name="search-outline" size={16} color={'gray'} />
      <SSearchInput onPressIn={onPressIn} {...others} />
    </SInputWrapper>
  );
};

export default SearchInput;

const SInputWrapper = styled.View`
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')}
  gap: 10px;
`;

const SSearchInput = styled.TextInput.attrs({
  placeholder: 'Search',
  color: 'gray',
})`
  font-family: 'Poppins-Regular';
  flex-grow: 1;
  flex-shrink: 1;
  height: 40px;
  color: ${({theme}) => theme.style.colors.text};
`;
