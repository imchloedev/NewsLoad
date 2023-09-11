import {useQuery} from 'react-query';
import {instance} from '~/apis/client';
import Config from 'react-native-config';

//GET https://newsapi.org/v2/top-headlines?country=kr&category=business&apiKey=77014987d67f4f648537b4c9f0af1450

const getNewsByCategory = async (category: string) => {
  const {data} = await instance.get(
    `/v2/top-headlines?country=us&category=${category}&apiKey=${Config.API_KEY}`,
  );

  return data.articles;
};

export const useNewsByCategoryQuery = (category: string) => {
  const {data: news} = useQuery(['news', {category: category}], () =>
    getNewsByCategory(category),
  );

  return {news};
};
