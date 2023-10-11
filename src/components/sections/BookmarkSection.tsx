import React, {Suspense} from 'react';
import {
  FlatList,
  Text,
  View,
  Pressable,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/Ionicons';
import {SmallCardItem} from '@components/card';
import {ListFooter, Separator, Title} from '@components/common';
import {useSavedNewsQuery} from '@lib/hooks/queries';
import {useDeleteSavedMutation} from '@lib/hooks/mutations';
import useThemeColors from '@lib/hooks/common/useThemeColors';
import {IArticle} from '@lib/types';
import {showToast} from '@lib/utils';

interface IBookmarkSectionProps {
  onMoveToScreen: (article: IArticle) => void;
}

const BookmarkSection = ({onMoveToScreen}: IBookmarkSectionProps) => {
  const currentUser = auth().currentUser;
  const {saved} = useSavedNewsQuery(currentUser);
  const {mutation: onDeleteArticle} = useDeleteSavedMutation(currentUser);
  const theme = useThemeColors();

  const renderRightActions = (
    dragX: Animated.AnimatedInterpolation<string | number>,
    id: string,
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 1],
      outputRange: [100, 0],
    });

    return (
      <Pressable
        onPress={() => {
          onDeleteArticle.mutate(id);
          showToast('Removed from the bookmark list');
        }}>
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
            <SSavedItemContainer>
              <GestureHandlerRootView>
                <Swipeable
                  renderRightActions={dragX => {
                    if (!item.id) {
                      return;
                    }
                    return renderRightActions(dragX, item.id);
                  }}>
                  <Suspense fallback={<ActivityIndicator />}>
                    <SmallCardItem
                      article={item.article}
                      onMoveToScreen={onMoveToScreen}
                    />
                  </Suspense>
                </Swipeable>
              </GestureHandlerRootView>
            </SSavedItemContainer>
          )}
          ListFooterComponent={() =>
            saved.length === 0 && (
              <ListFooter>No saved articles yet.</ListFooter>
            )
          }
        />
      )}
    </View>
  );
};

export default BookmarkSection;

const STitleWrapper = styled.View`
  padding: 20px 0;
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')};
  gap: 10px;
`;

const SSavedItemContainer = styled.View`
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 20px;
  overflow: hidden;
`;
