import React from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import {SmallCardItem} from '@components/card';
import {Title} from '@components/common';
import {useNewsByChannelQuery} from '~/hooks';
import {ScreenProps} from './@types';

const ChannelScreen = ({navigation, route}: ScreenProps<'Channel'>) => {
  const {channel} = route.params;
  const {news} = useNewsByChannelQuery(channel);

  const getTitle = (channelName: string) => {
    const arr = channelName.split('-');
    return `${arr[0]} news`;
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={news}
        ListHeaderComponent={() => (
          <STitleWrapper>
            <SChannelCopy>Explore</SChannelCopy>
            <Title titleRole="main" title={getTitle(channel).toUpperCase()} />
          </STitleWrapper>
        )}
        renderItem={({item}) => (
          <SCardItemWrapper>
            <SmallCardItem
              article={item}
              onMoveToScreen={() => console.log('DD')}
            />
          </SCardItemWrapper>
        )}
      />
    </View>
  );
};

export default ChannelScreen;

const SText = styled.Text`
  font-family: 'Poppins-Regular';
`;

const STitleWrapper = styled.View`
  padding: 20px 18px;
`;

const SCardItemWrapper = styled.View`
  padding: 10px 18px;
`;

const SChannelCopy = styled(SText)`
  margin-top: 10px;
  font-size: 14px;
  font-weight: 600;
  color: ${({theme}) => theme.style.colors.primary};
`;
