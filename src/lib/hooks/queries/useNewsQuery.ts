import {useQuery} from 'react-query';
import {instance} from '~/apis/client';
import Config from 'react-native-config';
import {IArticle} from '@lib/types';
import {newsQueryKeys} from '@lib/factories/newsQueryKeys';

export const getNews = async (): Promise<IArticle[]> => {
  const {data} = await instance.get(
    `/v2/top-headlines?country=us&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

export const useNewsQuery = (start?: number, total?: number) => {
  const {data: news} = useQuery(newsQueryKeys.headlines(), getNews, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 6 * 1000,
    select: data => {
      if (total) {
        return data.slice(start, total);
      } else {
        return data;
      }
    },
  });

  return {news};
};
