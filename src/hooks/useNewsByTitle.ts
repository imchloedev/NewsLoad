import Config from 'react-native-config';
import {useQuery} from 'react-query';
import {instance} from '~/apis/client';
import {getDomain} from '~/utils/getDomain';

// encodeURIComponent
// 공백 -> %20

interface ITileUrl {
  title: string;
  url: string;
}

const getNewsByTitle = async (title: string) => {
  console.log();
  const {data} = await instance.get(
    `/v2/everything?q=${encodeURIComponent(title)}&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

export const useNewsByTitleQuery = (title: string) => {
  const {data: article} = useQuery(
    ['news', {tile: title}],
    () => getNewsByTitle(title),
    {select: data => data[0]},
  );

  return {article};
};
