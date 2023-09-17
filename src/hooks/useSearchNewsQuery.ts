import Config from 'react-native-config';
import {useInfiniteQuery, useQuery} from 'react-query';
import {instance} from '~/apis/client';

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

export const useSearchNewsQuery = (query: string) => {
  const {
    data: news,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    ['news', 'headlines', {keyword: query}],
    ({pageParam = 1}) => getSearchResult({pageParam, query}),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length === 10 ? allPages.length + 1 : null,
      enabled: !!query,
      select: data => ({
        pages: data.pages.map(page => page).flat(),
        pageParams: data.pageParams,
      }),
    },
  );

  return {news, fetchNextPage, isLoading, isFetching, hasNextPage};
};
