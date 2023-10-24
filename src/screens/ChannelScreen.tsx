import React, {Suspense, useCallback} from 'react';
import {LoadingSpinner} from '@components/common';
import {ScreenProps} from './@types';
import ChannelNewsSection from '@components/sections/ChannelNewsSection';
import RetryErrorBoundary from '@components/errorBoundaries/RetryErrorBoundary';
import {IArticle} from '@lib/types';

const ChannelScreen = ({navigation, route}: ScreenProps<'Channel'>) => {
  const {channel} = route.params;

  const onMoveToScreen = useCallback((article: IArticle) => {
    navigation.navigate('View', {article});
  }, []);

  return (
    <RetryErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <ChannelNewsSection
          channelName={channel}
          onMoveToScreen={onMoveToScreen}
        />
      </Suspense>
    </RetryErrorBoundary>
  );
};

export default ChannelScreen;
