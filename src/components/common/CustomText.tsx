import React from 'react';
import styled from 'styled-components/native';

const CustomText = ({children}: any) => {
  return <SCustomText>{children}</SCustomText>;
};

export default CustomText;

export const SCustomText = styled.Text`
  font-family: 'Poppins-Regular';
`;
