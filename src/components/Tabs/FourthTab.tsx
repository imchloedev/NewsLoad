import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import SmallCardItem from '~/components/card/SmallCardItem';
import {useNewsInfiniteQuery} from '~/hooks';
import {
  ITabProps,
  STabContainer,
  handleLoadMore,
  SListFooterCopy,
} from './FirstTab';

const FourthTab = ({onMoveToScreen}: ITabProps) => {
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useNewsInfiniteQuery('science');

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

export default FourthTab;
