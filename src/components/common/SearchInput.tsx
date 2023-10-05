import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ISearchInput {
  editable?: boolean;
  onChangeText?: any;
  autoFocus?: boolean;
  autoCapitalize?: any;
}

const SearchInput = ({...others}: ISearchInput) => {
  return (
    <SInputWrapper>
      <Icon name="search-outline" size={16} color={'gray'} />
      <SSearchInput {...others} />
    </SInputWrapper>
  );
};

export default SearchInput;

const SInputWrapper = styled.View`
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')}
  gap: 10px;
  height: 44x;
`;

const SSearchInput = styled.TextInput.attrs({
  placeholder: 'Search',
  color: 'gray',
  numberOfLines: 1,
})`
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')}
  font-family: 'Poppins-Regular';
  flex-grow: 1;
  flex-shrink: 1;
  color: ${({theme}) => theme.style.colors.text};
  height: 44px;
`;
