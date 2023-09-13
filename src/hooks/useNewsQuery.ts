import {useQuery} from 'react-query';
import {instance} from '~/apis/client';
import Config from 'react-native-config';
import {IArticle} from '~/store/atom';

export const getNews = async (): Promise<IArticle[]> => {
  const {data} = await instance.get(
    `/v2/top-headlines?country=us&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

export const useNewsQuery = (start?: number, total?: number) => {
  const {data: news} = useQuery(['news'], getNews, {
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
