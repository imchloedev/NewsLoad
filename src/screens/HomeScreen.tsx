import React, {Suspense} from 'react';
import {ScrollView} from 'react-native';
import styled from 'styled-components/native';
import {LargeCardSection, SmallCardSection} from '@components/card';
import {Title, ChannelItem, LoadingSpinner} from '@components/common';
import {Abc, Bbc, Cnn, Cbs, Fox, Nbc, Insider} from '@components/assets';
import RetryErrorBoundary from '@components/errorBoundaries/RetryErrorBoundary';
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
        <RetryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <LargeCardSection onMoveToScreen={onMoveToScreen} />
          </Suspense>
        </RetryErrorBoundary>
      </SSection>

      <SSection>
        <STitleWrapper>
          <Title titleRole="sub" title="Today's Headlines" />
        </STitleWrapper>
        <SContentWrapper>
          <RetryErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <SmallCardSection onMoveToScreen={onMoveToScreen} />
            </Suspense>
          </RetryErrorBoundary>
        </SContentWrapper>
      </SSection>

      <SSection>
        <STitleWrapper>
          <Title titleRole="sub" title="Explore Channels" />
        </STitleWrapper>
        <SChannelsContainer>
          {CHANNELS.map(({name, component}) => (
            <ChannelItem
              key={name}
              channel={name}
              onMoveToChannel={onMoveToChannel}>
              {component}
            </ChannelItem>
          ))}
        </SChannelsContainer>
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

const SChannelsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 18px;
  padding: 20px 18px;
`;
