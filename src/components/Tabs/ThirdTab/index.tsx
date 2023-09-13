import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {
  ITabProps,
  STabContainer,
  handleLoadMore,
  SListFooterCopy,
} from '../FirstTab';
import SmallCardItem from '@components/card/SmallCardItem';
import {useNewsInfiniteQuery} from '~/hooks';

const ThirdTab = ({onMoveToScreen}: ITabProps) => {
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useNewsInfiniteQuery('health');

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

export default ThirdTab;
