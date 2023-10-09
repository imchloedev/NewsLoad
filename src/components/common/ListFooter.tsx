import React from 'react';
import styled from 'styled-components/native';

interface IListFooterProps {
  children: React.ReactNode;
}

const ListFooter = ({children}: IListFooterProps) => {
  return <SListFooterCopy>{children}</SListFooterCopy>;
};

export default ListFooter;

const SListFooterCopy = styled.Text`
  text-align: center;
  padding: 20px 0;
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.middleGray};
`;
