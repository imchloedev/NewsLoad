import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

interface IChannelItem {
  channel: {
    name: string;
    component: React.JSX.Element;
  };
}

const windowWidth = Dimensions.get('window').width;

const ChannelItem = ({channel}: IChannelItem) => {
  return (
    <SChannelWrapper>
      <SChannelInner>{channel.component}</SChannelInner>
    </SChannelWrapper>
  );
};

export default ChannelItem;

const SChannelWrapper = styled.View`
  width: ${windowWidth / 5.7 + 18}px;
  height: ${windowWidth / 5.7}px;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;

const SChannelInner = styled.View`
  width: ${windowWidth / 5.7}px;
  height: ${windowWidth / 5.7}px;
  background-color: white;
  border-radius: 100px;
  ${({theme}) => theme.variables.flex('column', 'center', 'center')}
`;
