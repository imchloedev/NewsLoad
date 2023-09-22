import React, {Suspense, useEffect, useState} from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import BookmarkSection from '@components/sections/BookmarkSection';
import RetryErrorBoundary from '@components/errorBoundaries/RetryErrorBoundary';
import {LoadingSpinner} from '@components/common';
import {ScreenProps} from './@types';
import {IArticle} from '~/types';
import {useIsFocused} from '@react-navigation/native';

const BookmarkScreen = ({navigation}: ScreenProps<'Bookmark'>) => {
  const [user, setUser] = useState(auth().currentUser);
  const isFocused = useIsFocused();

  const onMoveToScreen = (article: IArticle) => {
    navigation.navigate('View', {article});
  };

  useEffect(() => {
    setUser(auth().currentUser);
  }, [isFocused]);

  return (
    <SContainer>
      {user ? (
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
