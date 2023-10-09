import {useQuery} from 'react-query';
import {viewedListCollection} from '~/apis/database';
import {TUser} from '@lib/types';
import {newsQueryKeys} from '@lib/factories/newsQueryKeys';

const getViewedNews = async (user: TUser) => {
  if (!user || !user.uid) {
    return [];
  }

  const querySnapShot = await viewedListCollection
    .where('userId', '==', user?.uid)
    .orderBy('createdAt', 'desc')
    .get();

  const data = querySnapShot.docs.map(documentSnapshot => {
    const docData: any = documentSnapshot.data();
    return {
      id: documentSnapshot.id,
      userId: docData.userId,
      article: docData.article,
    };
  });

  return data;
};

export const useViewedNewsQuery = (user: TUser) => {
  const {data: viewed} = useQuery(newsQueryKeys.history(user), () =>
    getViewedNews(user),
  );
  return {viewed};
};
