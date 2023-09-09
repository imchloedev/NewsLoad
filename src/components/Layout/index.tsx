import React from 'react';
import {styled} from 'styled-components/native';

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = ({children}: ILayoutProps) => {
  return <SContainer>{children}</SContainer>;
};

export default Layout;

const SContainer = styled.View`
  flex: 1;
  /* background-color: white; */
`;
