import React from 'react';
import styled from 'styled-components/native';

interface ISubTitleProps {
  title: string;
  titleRole: string;
}

const Title = ({titleRole, title}: ISubTitleProps) => {
  return <STitleCopy titleRole={titleRole}>{title}</STitleCopy>;
};

export default Title;

export const STitleCopy = styled.Text<{titleRole: string}>`
  font-family: 'Poppins-Bold';
  font-size: ${({titleRole}) => (titleRole === 'main' ? '24px' : '18px')};
  color: ${({theme}) => theme.style.colors.text};
`;
