import React from 'react';
import {styled} from 'styled-components/native';

interface ISubTitleProps {
  title: string;
  titleRole: string;
}

const Title = ({titleRole, title}: ISubTitleProps) => {
  return <STitleCopy titleRole={titleRole}>{title}</STitleCopy>;
};

export default Title;

const STitleCopy = styled.Text<{titleRole: string}>`
  font-size: ${({titleRole}) => (titleRole === 'main' ? '24px' : '20px')};
  font-weight: bold;
  color: ${({theme}) => theme.style.colors.text};
`;
