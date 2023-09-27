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
    <SChannelItem onPress={() => onMoveToChannel(channel)}>
      {children}
    </SChannelItem>
  );
};

export default ChannelItem;

const SChannelItem = styled.TouchableOpacity`
  flex-shrink: 0;
  flex-basis: ${((windowWidth - 18 * 2) * 33.3) / 100 - 12}px;
  flex-grow: 0;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
  background-color: ${({theme}) => theme.style.colors.card};
  padding: 16px;
  border-radius: 20px;
`;
