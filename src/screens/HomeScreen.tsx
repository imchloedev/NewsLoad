import React from 'react';
import {FlatList, ScrollView, Image} from 'react-native';
import {styled} from 'styled-components/native';
import {LargeCardSection, SmallCardSection} from '@components/card';
import {Title, ChannelItem} from '@components/common';
import {HomeScreenProps} from '@screens/@types';

// 채널 다크모드 스타일링
const channelStyle = {width: 30, height: 30};
const CHANNELS = [
  {
    name: 'abc-news',
    component: (
      <Image
        style={channelStyle}
        source={require('../assets/images/channels/abc-news.png')}
      />
    ),
  },
  {
    name: 'bbc',
    component: (
      <Image
        style={channelStyle}
        source={require('../assets/images/channels/bbc.png')}
      />
    ),
  },
  {
    name: 'cbs',
    component: (
      <Image
        style={channelStyle}
        source={require('../assets/images/channels/cbs.png')}
      />
    ),
  },
  {
    name: 'cnn',
    component: (
      <Image
        style={channelStyle}
        source={require('../assets/images/channels/cnn.png')}
      />
    ),
  },
  {
    name: 'fox',
    component: (
      <Image
        style={channelStyle}
        source={require('../assets/images/channels/fox.png')}
      />
    ),
  },
  {
    name: 'nbc',
    component: (
      <Image
        style={channelStyle}
        source={require('../assets/images/channels/nbc.png')}
      />
    ),
  },
  {
    name: 'npr',
    component: (
      <Image
        style={channelStyle}
        source={require('../assets/images/channels/npr.png')}
      />
    ),
  },
];

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const onMoveToScreen = (title: string, url: string) => {
    navigation.navigate('View', {title: title, url: url});
  };

  return (
    <ScrollView>
      <STitleWrapper>
        <Title titleRole="sub" title="Hottest News" />
      </STitleWrapper>

      <LargeCardSection onMoveToScreen={onMoveToScreen} />

      <SSecondTitleWrapper>
        <Title titleRole="sub" title="Today's Headlines" />
      </SSecondTitleWrapper>

      <SChannelCarousel>
        <FlatList
          data={CHANNELS}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingRight: 18 / 2}}
          renderItem={({item}) => <ChannelItem channel={item} />}
        />
      </SChannelCarousel>
      <SContentWrapper>
        <SmallCardSection onMoveToScreen={onMoveToScreen} />
      </SContentWrapper>
    </ScrollView>
  );
};

export default HomeScreen;

const SContentWrapper = styled.View`
  padding: 40px 18px;
`;

const STitleWrapper = styled.View`
  padding: 20px 18px 10px 18px;
`;

const SSecondTitleWrapper = styled(STitleWrapper)`
  padding: 80px 18px 10px 18px;
`;

const SChannelCarousel = styled.View`
  margin-top: 20px;
  margin-left: 9px;
`;
