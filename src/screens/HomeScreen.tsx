import React from 'react';
import {FlatList, ScrollView, Text} from 'react-native';
import styled from 'styled-components/native';
import {LargeCardSection, SmallCardSection} from '@components/card';
import {Title, ChannelItem} from '@components/common';
import {Abc, Bbc, Cnn, Cbs, Fox, Nbc, Insider} from '@components/assets';
import {useThemeColors} from '~/hooks';
import {ScreenProps} from './@types';
import {IArticle} from '~/types';

const HomeScreen = ({navigation}: ScreenProps<'Home'>) => {
  const theme = useThemeColors();
  const CHANNELS = [
    {
      name: 'abc-news',
      component: <Abc size={40} fill={'none'} stroke={theme.colors.text} />,
    },
    {
      name: 'bbc-news',
      component: <Bbc size={40} fill={theme.colors.text} stroke={'none'} />,
    },
    {
      name: 'cbs-news',
      component: <Cbs size={40} fill={theme.colors.text} stroke={'none'} />,
    },
    {
      name: 'cnn',
      component: <Cnn size={40} fill={theme.colors.text} stroke={'none'} />,
    },
    {
      name: 'fox-news',
      component: <Fox size={40} fill={theme.colors.text} stroke={'none'} />,
    },
    {
      name: 'nbc-news',
      component: <Nbc size={40} fill={theme.colors.text} stroke={'none'} />,
    },
    {
      name: 'business-insider',
      component: <Insider size={40} fill={theme.colors.text} stroke={'none'} />,
    },
  ];

  const onMoveToScreen = (article: IArticle) => {
    navigation.navigate('View', {article});
  };

  const onMoveToChannel = (channel: string) => {
    navigation.navigate('Channel', {channel: channel});
  };

  return (
    <ScrollView>
      <SSection>
        <STitleWrapper>
          <Title titleRole="sub" title="Hottest News" />
        </STitleWrapper>
        <LargeCardSection onMoveToScreen={onMoveToScreen} />
      </SSection>

      <SSection>
        <STitleWrapper>
          <Title titleRole="sub" title="Today's Headlines" />
        </STitleWrapper>
        <SContentWrapper>
          <SmallCardSection onMoveToScreen={onMoveToScreen} />
        </SContentWrapper>
      </SSection>

      <SSection>
        <STitleWrapper>
          <Title titleRole="sub" title="Explore Channels" />
        </STitleWrapper>
        <SChannelCarousel>
          <FlatList
            data={CHANNELS}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 18 / 2}}
            renderItem={({item}) => (
              <ChannelItem
                channel={item.name}
                onMoveToChannel={onMoveToChannel}>
                {item.component}
              </ChannelItem>
            )}
          />
        </SChannelCarousel>
      </SSection>
    </ScrollView>
  );
};

export default HomeScreen;

const SSection = styled.View`
  padding-bottom: 60px;
`;

const SContentWrapper = styled.View`
  padding: 0px 18px;
`;

const STitleWrapper = styled.View`
  padding: 20px 18px;
`;

const SChannelCarousel = styled.View`
  margin-left: 9px;
  margin-bottom: 80px;
`;
