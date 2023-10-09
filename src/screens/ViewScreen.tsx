import React, {useEffect, useRef, useState} from 'react';
import {Animated, Image, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import {Toast} from '@components/common';
import {SArticleImageCopy} from '@components/card/SmallCardItem';
import {dateToString, showAlert, windowHeight, windowWidth} from '~/lib/utils';
import {useSavedNewsQuery, useViewedNewsQuery} from '@lib/hooks/queries';
import {
  useAddViewedListMutation,
  useUpdateViewListMutation,
  useSaveMutation,
} from '@lib/hooks/mutations';
import useThemeColors from '@lib/hooks/common/useThemeColors';
import {ScreenProps} from './@types';
import {ISavedArticle} from '@lib/types';

const ViewScreen = ({navigation, route}: ScreenProps<'View'>) => {
  const currentUser = auth().currentUser;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isToastVisible, setIsToastVisible] = useState(false);
  const theme = useThemeColors();
  // query
  const {viewed} = useViewedNewsQuery(currentUser);
  const {saved} = useSavedNewsQuery(currentUser);
  // mutation
  const {mutation: onSaveArticle} = useSaveMutation(currentUser);
  const {mutation: onAddViewedList} = useAddViewedListMutation(currentUser);
  const {mutation: onUpdateViewedList} = useUpdateViewListMutation(currentUser);

  const {title, author, publishedAt, urlToImage, description, url} =
    route.params.article;
  const isArticleSaved =
    saved && saved.some((list: ISavedArticle) => list.article.title === title);
  const addedArticle = {
    userId: currentUser?.uid,
    createdAt: Date.now(),
    article: route.params.article,
  };

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  const handleBookmark = async () => {
    if (!isArticleSaved) {
      await onSaveArticle.mutate({...addedArticle, isSaved: true});
      setIsToastVisible(true);
    } else {
      showAlert('Alert', 'This article was already in your bookmark list');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Icon
          name={isArticleSaved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={theme.colors.text}
          onPress={() =>
            currentUser
              ? handleBookmark()
              : showAlert('Failed', 'Please sign in.')
          }
        />
      ),
    });
  }, [isArticleSaved]);

  useEffect(() => {
    if (!currentUser || !route.params.article) {
      return;
    } else if (
      viewed?.find(list => list.article.title === route.params.article.title)
    ) {
      const item = viewed?.filter(
        list => list.article.title === route.params.article.title,
      )[0];
      const id = item?.id;
      const updated = {...addedArticle, createdAt: Date.now()};
      onUpdateViewedList.mutate({id, updated});
    } else {
      onAddViewedList.mutate(addedArticle);
    }
  }, []);

  return (
    <>
      {isToastVisible && (
        <Toast
          text="Saved to bookmark list."
          onClose={() => setIsToastVisible(false)}
          bottom={50}
          isWrapped={false}
        />
      )}
      <SContainer onScroll={handleScroll} scrollEventThrottle={16}>
        <Animated.View
          style={{
            height: scrollY.interpolate({
              inputRange: [0, windowHeight / 2],
              outputRange: [windowHeight / 2, 0],
              extrapolate: 'clamp',
            }),
          }}>
          <SImageWrapper>
            {urlToImage ? (
              <Image
                source={{uri: urlToImage}}
                style={{
                  width: windowWidth,
                  height: windowHeight / 2,
                  resizeMode: 'cover',
                }}
              />
            ) : (
              <SArticleImageCopy>Image not provided</SArticleImageCopy>
            )}
          </SImageWrapper>
        </Animated.View>
        <SInfoWrapper>
          <SInfoHeader>
            <STitle>{title}</STitle>
            <SAuthor>Written by {author}</SAuthor>
            <SDate>Published at {dateToString(publishedAt)}</SDate>
          </SInfoHeader>

          <SContent>{description}</SContent>
          <SContent>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </SContent>
          <TouchableOpacity
            onPress={() => navigation.navigate('WebView', {url})}>
            <SUrlBtnCopy>To keep reading this article, Click here!</SUrlBtnCopy>
          </TouchableOpacity>
        </SInfoWrapper>
      </SContainer>
    </>
  );
};

export default ViewScreen;

const SContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.style.colors.card};
`;

const SInfoWrapper = styled.View`
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 40px 40px 0 0;
  padding: 40px 18px 100px 18px;
  margin-top: -40px;
`;

const SInfoHeader = styled.View`
  padding-bottom: 40px;
`;

const SText = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.text};
`;

const STitle = styled(SText)`
  font-size: 24px;
  font-family: 'Poppins-Bold';
  padding-bottom: 20px;
`;

const SAuthor = styled(SText)`
  font-size: 14px;
  color: ${({theme}) => theme.style.colors.gray};
`;

const SDate = styled(SText)`
  font-size: 14px;
  color: ${({theme}) => theme.style.colors.gray};
`;

const SContent = styled(SText)`
  padding: 14px 0;
  font-size: 16px;
  line-height: 24px;
`;

const SUrlBtnCopy = styled(SText)`
  color: ${({theme}) => theme.style.colors.primary};
  text-align: center;
  padding: 10px 0;
  font-family: 'Poppins-Bold';
`;

const SImageWrapper = styled.View`
  width: ${windowWidth}px;
  height: ${windowHeight / 2}px;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;
