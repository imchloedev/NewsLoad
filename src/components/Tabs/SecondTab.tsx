import React from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import {ITabProps, STabContainer} from './FirstTab';
import {SmallCardItem} from '@components/card';
import {ListFooter} from '@components/common';
import {useNewsInfiniteQuery} from '~/hooks';
import {loadMoreData} from '~/utils';

const SecondTab = ({onMoveToScreen}: ITabProps) => {
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useNewsInfiniteQuery('entertainment');

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

export default SecondTab;
