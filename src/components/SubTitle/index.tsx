import React from 'react';
import {Text, View} from 'react-native';
import {styled} from 'styled-components/native';

interface ISubTitleProps {
  title: string;
}

const SubTitle = ({title}: ISubTitleProps) => {
  return (
    <View>
      <SSubTitleCopy>{title}</SSubTitleCopy>
    </View>
  );
};

export default SubTitle;

const SSubTitleCopy = styled.Text`
  font-size: 20px;
  font-weight: bold;
  padding: 20px 0;
`;
