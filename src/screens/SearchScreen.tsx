import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import {SmallCardItem} from '@components/card';
import {
  ListFooter,
  CustomHeader,
  Separator,
  LoadingSpinner,
} from '@components/common';
import {useSearchNewsInfiniteQuery} from '~/hooks';
import {loadMoreData} from '~/utils';
import {ScreenProps} from './@types';
import {IArticle} from '~/types';

const SearchScreen = ({navigation}: ScreenProps<'Search'>) => {
  const [text, setText] = useState('');
  const currentUser = auth().currentUser;
  const {news, fetchNextPage, isFetching, hasNextPage} =
    useSearchNewsInfiniteQuery(text, currentUser);

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
          ItemSeparatorComponent={() => <Separator />}
          renderItem={({item}) => (
            <SmallCardItem article={item} onMoveToScreen={onMoveToScreen} />
          )}
          ListFooterComponent={() => {
            if (!hasNextPage && !(news.pages.length === 0)) {
              return <ListFooter>All articles loaded.</ListFooter>;
            }
          }}
          ListEmptyComponent={() => <ListFooter>None Found</ListFooter>}
        />
      )}
      {isFetching && <LoadingSpinner />}
    </SResultContainer>
  );
};

export default SearchScreen;

const SResultContainer = styled.View`
  flex: 1;
  margin-top: 20px;
  padding: 0 18px;
`;
