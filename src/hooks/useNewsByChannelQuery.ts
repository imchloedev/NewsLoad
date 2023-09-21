import {useQuery} from 'react-query';
import {instance} from '~/apis/client';
import Config from 'react-native-config';
import {IArticle} from '~/types';

export const getNewsByChannel = async (
  channel: string,
): Promise<IArticle[]> => {
  const {data} = await instance.get(
    `/v2/top-headlines?sources=${channel}&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

export const useNewsByChannelQuery = (channel: string) => {
  const {data: news} = useQuery(
    ['news', channel],
    () => getNewsByChannel(channel),
    {
      onSuccess: () => console.log('DD'),
    },
  );

  return {news};
};
