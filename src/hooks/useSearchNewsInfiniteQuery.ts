import Config from 'react-native-config';
import {useInfiniteQuery} from 'react-query';
import {instance} from '~/apis/client';
import {TUser} from '~/types';
import {createUserSearchQueryKey} from '~/utils';

interface IGetSearchResult {
  query: string;
  pageParam: number;
}

const getSearchResult = async ({query, pageParam}: IGetSearchResult) => {
  const {data} = await instance.get(
    `/v2/top-headlines?q=${query}&page=${pageParam}&pageSize=10&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

export const useSearchNewsInfiniteQuery = (query: string, user: TUser) => {
  const {
    data: news,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    createUserSearchQueryKey(user, query),
    ({pageParam = 1}) => getSearchResult({pageParam, query}),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 10 ? allPages.length + 1 : null,
      enabled: !!query,
      select: data => ({
        pages: data.pages.map(page => page).flat(),
        pageParams: data.pageParams,
      }),
      suspense: false,
      useErrorBoundary: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  );

  return {news, fetchNextPage, isLoading, isFetching, hasNextPage};
};
