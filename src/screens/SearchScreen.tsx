import React, {useEffect, useState} from 'react';
import {StatusBar, Platform, FlatList, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Ionicons';
import {SmallCardItem} from '@components/card';
import {ListFooter, SearchInput} from '@components/common';
import useThemeColors from '~/hooks/useThemeColors';
import {useSearchNewsQuery} from '~/hooks/useSearchNewsQuery';
import {loadMoreData} from '~/utils';
import {SearchScreenProps} from './@types';
import {IArticle} from '~/store/atom';

const statusBarHeight =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

const SearchScreen = ({navigation}: SearchScreenProps) => {
  const theme = useThemeColors();
  const [text, setText] = useState('');
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useSearchNewsQuery(text);

  const onMoveToScreen = (article: IArticle) => {
    navigation.push('View', {article});
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <SHeader statusBarHeight={statusBarHeight}>
          <Icon
            name="arrow-back-outline"
            size={22}
            color={theme.colors.text}
            onPress={() => navigation.goBack()}
          />
          <SInputContainer>
            <SearchInput
              onChangeText={setText}
              autoFocus={true}
              autoCapitalize="none"
            />
          </SInputContainer>
        </SHeader>
      ),
    });
  }, []);

  return (
    <SResultContainer>
      {news && (
        <FlatList
          data={news?.pages}
          onEndReached={() => loadMoreData(hasNextPage, fetchNextPage)}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <SmallCardItem article={item} onMoveToScreen={onMoveToScreen} />
          )}
          ListFooterComponent={() =>
            !isLoading && !hasNextPage && <ListFooter>None found </ListFooter>
          }
        />
      )}
      {isFetching && <ActivityIndicator />}
    </SResultContainer>
  );
};

export default SearchScreen;

const SResultContainer = styled.View`
  flex: 1;
  margin-top: 30px;
  padding: 0 18px;
`;

const SHeader = styled.View<{statusBarHeight: number | undefined}>`
  width: 100%;
  height: ${({statusBarHeight}) => statusBarHeight && statusBarHeight + 50}px;
  padding: 50px 18px 0 18px;
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')}
  gap: 20px;
`;

const SInputContainer = styled.View`
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 20px;
  padding: 0 10px;
  flex-shrink: 1;
  flex-grow: 1;
`;
