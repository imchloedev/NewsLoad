import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {styled} from 'styled-components/native';
import {FetchNextPageOptions, UseInfiniteQueryResult} from 'react-query';
import SmallCardItem from '@components/card/SmallCardItem';
import {TOnMoveToScreen} from '@components/card/LargeCardSection';
import {useNewsInfiniteQuery} from '~/hooks';

export interface ITabProps {
  onMoveToScreen: TOnMoveToScreen;
}

export const handleLoadMore = (
  hasMore: boolean | undefined,
  fetchMore: (
    options?: FetchNextPageOptions,
  ) => Promise<UseInfiniteQueryResult>,
) => {
  if (hasMore) {
    fetchMore();
  }
};

const FirstTab = ({onMoveToScreen}: ITabProps) => {
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useNewsInfiniteQuery('business');

  return (
    <STabContainer>
      <FlatList
        data={news?.pages}
        onEndReached={() => handleLoadMore(hasNextPage, fetchNextPage)}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <SmallCardItem article={item} onMoveToScreen={onMoveToScreen} />
        )}
        ListFooterComponent={() =>
          !isLoading &&
          !hasNextPage && (
            <SListFooterCopy>All articles loaded.👋</SListFooterCopy>
          )
        }
      />
      {isFetching && <ActivityIndicator />}
    </STabContainer>
  );
};

export default FirstTab;

export const STabContainer = styled.View`
  padding: 20px 18px;
`;

export const SListFooterCopy = styled.Text`
  text-align: center;
  padding: 20px 0;
`;
