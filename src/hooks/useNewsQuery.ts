import {useQuery} from 'react-query';
import {instance} from '~/apis/client';
import Config from 'react-native-config';

// https://newsapi.org/v2/top-headlines?country=kr&apiKey=9b9cc0aa70394bc4950b08fb1faca2f7
const getNews = async () => {
  const {data} = await instance.get(
    `/v2/top-headlines?country=kr&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

export const useNewsQuery = () => {
  const {data: news} = useQuery(['news'], getNews);

  return {news};
};
