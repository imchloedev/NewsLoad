import {useQuery} from 'react-query';
import {bookmarksCollection} from '~/apis/database';
import {TUser} from '~/types';

const getSavedNews = async (user: TUser) => {
  const querySnapshot = await bookmarksCollection
    .where('userId', '==', user?.uid)
    .orderBy('createdAt', 'desc')
    .get();

  const data: any = querySnapshot.docs.map(documentSnapshot => {
    const docData = documentSnapshot.data();
    return {
      id: documentSnapshot.id,
      userId: docData.userId,
      article: docData.article,
      isSaved: docData.isSaved,
    };
  });
  return data;
};

export const useSavedNewsQuery = (user: TUser) => {
  const {data: saved, isLoading} = useQuery(['saved'], () =>
    getSavedNews(user),
  );

  return {saved, isLoading};
};
