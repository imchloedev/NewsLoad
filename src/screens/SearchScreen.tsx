import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {SmallCardItem} from '@components/card';
import {ListFooter, CustomHeader, Separator} from '@components/common';
import {useSearchNewsInfiniteQuery} from '~/hooks';
import {loadMoreData} from '~/utils';
import {ScreenProps} from './@types';
import {IArticle} from '~/types';

const SearchScreen = ({navigation}: ScreenProps<'Search'>) => {
  const [text, setText] = useState('');
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useSearchNewsInfiniteQuery(text);

  const onMoveToScreen = (article: IArticle) => {
    navigation.push('View', {article});
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader navigation={navigation} setText={setText} />,
    });
  }, []);

  // error 처리
  return (
    <SResultContainer>
      {news && (
        <FlatList
          data={news?.pages}
          onEndReached={() => loadMoreData(hasNextPage, fetchNextPage)}
          onEndReachedThreshold={0.5}
          ItemSeparatorComponent={() => <Separator />}
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
  margin-top: 20px;
  padding: 0 18px;
`;
