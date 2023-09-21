import React from 'react';
import styled from 'styled-components/native';
import {windowWidth} from '~/utils';

interface IChannelItem {
  children: React.ReactNode;
  channel: string;
  onMoveToChannel: (channel: string) => void;
}

const ChannelItem = ({channel, children, onMoveToChannel}: IChannelItem) => {
  return (
    <SChannelWrapper onPress={() => onMoveToChannel(channel)}>
      <SChannelInner>{children}</SChannelInner>
    </SChannelWrapper>
  );
};

export default ChannelItem;

const SChannelWrapper = styled.TouchableOpacity`
  width: ${windowWidth / 5.7 + 18}px;
  height: ${windowWidth / 5.7}px;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;

const SChannelInner = styled.View`
  width: ${windowWidth / 5.7}px;
  height: ${windowWidth / 5.7}px;
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 100px;
  ${({theme}) => theme.variables.flex('column', 'center', 'center')}
`;
