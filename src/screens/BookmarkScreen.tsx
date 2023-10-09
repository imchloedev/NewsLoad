import React, {Suspense, useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import BookmarkSection from '@components/sections/BookmarkSection';
import RetryErrorBoundary from '@components/errorBoundaries/RetryErrorBoundary';
import {LoadingSpinner} from '@components/common';
import {ScreenProps} from './@types';
import {IArticle} from '@lib/types';
import useThemeColors from '@lib/hooks/common/useThemeColors';

const BookmarkScreen = ({navigation}: ScreenProps<'Bookmark'>) => {
  const [user, setUser] = useState(auth().currentUser);
  const isFocused = useIsFocused();
  const theme = useThemeColors();

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
        <SWrapper>
          <SSmallText>To save articles, please sign in.</SSmallText>
          <STextWrapper onPress={() => navigation.navigate('SignIn')}>
            <SText>Go to sign in</SText>
            <Icon
              name="arrow-forward-outline"
              size={22}
              color={theme.colors.text}
            />
          </STextWrapper>
        </SWrapper>
      )}
    </SContainer>
  );
};

export default BookmarkScreen;

const SContainer = styled.View`
  flex: 1;
  padding: 0 18px;
`;

const SWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const STextWrapper = styled.TouchableOpacity`
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
  gap: 10px;
  padding-top: 10px;
`;

const SText = styled.Text`
  font-family: 'Poppins-Bold';
  color: ${({theme}) => theme.style.colors.text};
  font-size: 18px;
`;

const SSmallText = styled(SText)`
  font-family: 'Poppins-Regular';
  font-size: 15px;
`;
