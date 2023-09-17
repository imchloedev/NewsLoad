import React from 'react';
import {styled} from 'styled-components/native';

interface ISubTitleProps {
  title: string;
  titleRole: string;
  styles?: any;
}

const Title = ({titleRole, title, styles}: ISubTitleProps) => {
  return (
    <STitleCopy styles={styles} titleRole={titleRole}>
      {title}
    </STitleCopy>
  );
};

export default Title;

const STitleCopy = styled.Text<{titleRole: string; styles: any}>`
  font-family: 'Poppins-Regular';
  font-size: ${({titleRole}) => (titleRole === 'main' ? '24px' : '20px')};
  font-weight: bold;
  color: ${({theme}) => theme.style.colors.text};
  ${({styles}) => styles};
`;
