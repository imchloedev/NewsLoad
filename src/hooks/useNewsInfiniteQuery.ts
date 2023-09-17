import {instance} from '~/apis/client';
import Config from 'react-native-config';
import {useInfiniteQuery} from 'react-query';

interface IGetNewsByCategory {
  pageParam?: number;
  category: string;
}

// news by category
const getNewsByCategory = async ({pageParam, category}: IGetNewsByCategory) => {
  const {data} = await instance.get(
    `/v2/top-headlines?country=us&category=${category}&page=${pageParam}&pageSize=10&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

// infiniteQuery hook
export const useNewsInfiniteQuery = (category: string) => {
  const {
    data: news,
    fetchNextPage,
    isFetching,
    isLoading,
    hasNextPage,
  } = useInfiniteQuery(
    ['news', 'headlines', {category: category}],
    ({pageParam = 1}) => getNewsByCategory({pageParam, category}),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === 10 ? allPages.length + 1 : null;
      },
      select: data => ({
        pages: data.pages.map(page => page).flat(),
        pageParams: data.pageParams,
      }),
    },
  );

  return {news, fetchNextPage, isLoading, isFetching, hasNextPage};
};
