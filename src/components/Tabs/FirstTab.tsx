import React from 'react';
import {ActivityIndicator, FlatList} from 'react-native';
import {styled} from 'styled-components/native';
import {SmallCardItem} from '@components/card';
import {ListFooter} from '@components/common';
import {TOnMoveToScreen} from '@components/card/LargeCardSection';
import {useNewsInfiniteQuery} from '~/hooks';
import {loadMoreData} from '~/utils';

export interface ITabProps {
  onMoveToScreen: TOnMoveToScreen;
}

const FirstTab = ({onMoveToScreen}: ITabProps) => {
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useNewsInfiniteQuery('business');

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

export default FirstTab;

export const STabContainer = styled.View`
  padding: 20px 18px;
`;
