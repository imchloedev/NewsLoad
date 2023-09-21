import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';

const LoadingSpinner = () => {
  return (
    <SSpinnerContainer>
      <ActivityIndicator />
    </SSpinnerContainer>
  );
};

export default LoadingSpinner;

const SSpinnerContainer = styled.View`
  padding: 60px;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;
