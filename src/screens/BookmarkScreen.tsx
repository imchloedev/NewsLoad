import React, {Suspense} from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import BookmarkSection from '@components/sections/BookmarkSection';
import RetryErrorBoundary from '@components/errorBoundaries/RetryErrorBoundary';
import {LoadingSpinner} from '@components/common';
import {ScreenProps} from './@types';
import {IArticle} from '~/types';

const BookmarkScreen = ({navigation}: ScreenProps<'Bookmark'>) => {
  const currentUser = auth().currentUser;

  const onMoveToScreen = (article: IArticle) => {
    navigation.navigate('View', {article});
  };

  return (
    <SContainer>
      {currentUser ? (
        <RetryErrorBoundary>
          <Suspense fallback={<LoadingSpinner />}>
            <BookmarkSection onMoveToScreen={onMoveToScreen} />
          </Suspense>
        </RetryErrorBoundary>
      ) : (
        <Button
          title="로그인하기"
          onPress={() => navigation.navigate('SignIn')}
        />
      )}
    </SContainer>
  );
};

export default BookmarkScreen;

const SContainer = styled.View`
  flex: 1;
  padding: 0 18px;
`;
