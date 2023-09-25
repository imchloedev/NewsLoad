import {useQuery} from 'react-query';
import {bookmarksCollection} from '~/apis/database';
import {TUser} from '~/types';
import {createUserSavedNewsQueryKey} from '~/utils';

const getSavedNews = async (user: TUser) => {
  if (!user || !user.uid) {
    return [];
  }

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
  const {data: saved, isLoading} = useQuery(
    createUserSavedNewsQueryKey(user),
    () => getSavedNews(user),
    {select: data => (user ? data : undefined)},
  );

  return {saved, isLoading};
};
