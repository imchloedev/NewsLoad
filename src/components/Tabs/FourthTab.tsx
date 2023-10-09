import React from 'react';
import {FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import {SmallCardItem} from '@components/card';
import {ListFooter, LoadingSpinner, Separator} from '@components/common';
import {ITabProps, STabContainer} from './FirstTab';
import {useNewsByCategoryInfiniteQuery} from '@lib/hooks/queries';
import {loadMoreData} from '@lib/utils';

const FourthTab = ({onMoveToScreen}: ITabProps) => {
  const currentUser = auth().currentUser;
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useNewsByCategoryInfiniteQuery('science', currentUser);

  return (
    <STabContainer>
      <FlatList
        data={news?.pages}
        onEndReached={() => loadMoreData(hasNextPage, fetchNextPage)}
        onEndReachedThreshold={0.5}
        renderItem={({item}) => (
          <SmallCardItem article={item} onMoveToScreen={onMoveToScreen} />
        )}
        ListFooterComponent={() =>
          !isLoading &&
          !hasNextPage && <ListFooter>All articles loaded.</ListFooter>
        }
        ItemSeparatorComponent={() => <Separator />}
      />
      {isFetching && <LoadingSpinner style={{paddingVertical: 10}} />}
    </STabContainer>
  );
};

export default FourthTab;
