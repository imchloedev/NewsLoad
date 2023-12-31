import {useQuery} from 'react-query';
import {instance} from '~/apis/client';
import Config from 'react-native-config';
import {IArticle, TUser} from '@lib/types';
import {newsQueryKeys} from '@lib/factories/newsQueryKeys';

export const getNewsByChannel = async (
  channel: string,
): Promise<IArticle[]> => {
  const {data} = await instance.get(
    `/v2/top-headlines?sources=${channel}&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

export const useNewsByChannelQuery = (channel: string, user: TUser) => {
  const {data: news} = useQuery(
    newsQueryKeys.channel(channel, user),
    () => getNewsByChannel(channel),
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    },
  );

  return {news};
};
