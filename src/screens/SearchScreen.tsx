import React, {useEffect, useState} from 'react';
import {FlatList, ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {SmallCardItem} from '@components/card';
import {ListFooter, CustomHeader} from '@components/common';
import {useSearchNewsQuery} from '~/hooks/useSearchNewsQuery';
import {loadMoreData} from '~/utils';
import {SearchScreenProps} from './@types';
import {IArticle} from '~/types';

const SearchScreen = ({navigation}: SearchScreenProps) => {
  const [text, setText] = useState('');
  const {news, fetchNextPage, isLoading, isFetching, hasNextPage} =
    useSearchNewsQuery(text);

  const onMoveToScreen = (article: IArticle) => {
    navigation.push('View', {article});
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => <CustomHeader navigation={navigation} setText={setText} />,
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
  margin-top: 20px;
  padding: 0 18px;
`;
