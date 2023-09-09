import React from 'react';
import {Text, View} from 'react-native';
import {styled} from 'styled-components/native';

interface ISubTitleProps {
  title: string;
}

const MainTitle = ({title}: ISubTitleProps) => {
  return <SMainTitleCopy>{title}</SMainTitleCopy>;
};

export default MainTitle;

const SMainTitleCopy = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;
