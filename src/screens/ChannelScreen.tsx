import React, {Suspense} from 'react';
import {LoadingSpinner} from '@components/common';
import {ScreenProps} from './@types';
import ChannelNewsSection from '@components/sections/ChannelNewsSection';
import RetryErrorBoundary from '~/components/errorBoundaries/RetryErrorBoundary';

const ChannelScreen = ({navigation, route}: ScreenProps<'Channel'>) => {
  const {channel} = route.params;

  return (
    <RetryErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <ChannelNewsSection channelName={channel} />
      </Suspense>
    </RetryErrorBoundary>
  );
};

export default ChannelScreen;
