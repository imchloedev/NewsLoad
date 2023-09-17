import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {SmallCardItem} from '@components/card';
import {ListFooter} from '@components/common';
import {useNewsInfiniteQuery} from '~/hooks';
import {ITabProps, STabContainer} from './FirstTab';
import {loadMoreData} from '~/utils';

const FourthTab = ({onMoveToScreen}: ITabProps) => {
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useNewsInfiniteQuery('science');

  return (
    <STabContainer>
      <FlatList
        data={news?.pages}
        onEndReached={() => loadMoreData(hasNextPage, fetchNextPage)}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <SmallCardItem article={item} onMoveToScreen={onMoveToScreen} />
        )}
        ListFooterComponent={() => !isLoading && !hasNextPage && <ListFooter />}
      />
      {isFetching && <ActivityIndicator />}
    </STabContainer>
  );
};

export default FourthTab;
