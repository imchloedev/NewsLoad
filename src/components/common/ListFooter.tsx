import React from 'react';
import styled from 'styled-components/native';

const ListFooter = () => {
  return <SListFooterCopy>All articles loaded.👋</SListFooterCopy>;
};

export default ListFooter;

const SListFooterCopy = styled.View`
  text-align: center;
  padding: 20px 0;
  font-family: 'Poppins-Regular';
`;
