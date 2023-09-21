import React from 'react';
import {Button, FlatList, Text, View, Pressable, Animated} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {SmallCardItem} from '@components/card';
import {ListFooter, Separator, Title} from '@components/common';
import {useThemeColors, useDeleteMutation, useSavedNewsQuery} from '~/hooks';
import {ScreenProps} from './@types';
import {IArticle} from '~/types';

const BookmarkScreen = ({navigation}: ScreenProps<'Bookmark'>) => {
  const currentUser = auth().currentUser;
  const {saved, isLoading} = useSavedNewsQuery(currentUser);
  const theme = useThemeColors();
  const {mutation: onDeleteArticle} = useDeleteMutation();

  const onMoveToScreen = (article: IArticle) => {
    navigation.navigate('View', {article});
  };

  const renderRightActions = (
    dragX: Animated.AnimatedInterpolation<string | number>,
    id: string,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <Pressable onPress={() => onDeleteArticle.mutate(id)}>
        <Animated.View
          style={{
            backgroundColor: 'red',
            transform: [{translateX: trans}],
            width: 100,
            height: 120,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontFamily: 'Poppins-Regular'}}>
            Delete
          </Text>
        </Animated.View>
      </Pressable>
    );
  };

  return (
    <SContainer>
      {currentUser ? (
        <View style={{flex: 1}}>
          {saved && (
            <FlatList
              ListHeaderComponent={() => (
                <STitleWrapper>
                  <Icon name="bookmark" size={22} color={theme.colors.text} />
                  <Title titleRole="main" title="Saved" />
                </STitleWrapper>
              )}
              data={saved}
              ItemSeparatorComponent={() => <Separator />}
              renderItem={({item}) => (
                <SSavedItemConatiner>
                  <GestureHandlerRootView>
                    <Swipeable
                      renderRightActions={dragX =>
                        renderRightActions(dragX, item.id)
                      }>
                      <SmallCardItem
                        article={item.article}
                        onMoveToScreen={onMoveToScreen}
                      />
                    </Swipeable>
                  </GestureHandlerRootView>
                </SSavedItemConatiner>
              )}
              ListFooterComponent={() =>
                saved.length === 0 && (
                  <ListFooter>No saved articles yet.</ListFooter>
                )
              }
            />
          )}
        </View>
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

const STitleWrapper = styled.View`
  padding: 20px 0;
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')};
  gap: 10px;
`;

const SSavedItemConatiner = styled.View`
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 20px;
  overflow: hidden;
`;
