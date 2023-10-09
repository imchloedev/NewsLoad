import {useMutation, useQueryClient} from 'react-query';
import {bookmarksCollection} from '~/apis/database';
import {IAddedArticle, TUser} from '@lib/types';
import {newsQueryKeys} from '@lib/factories/newsQueryKeys';

const saveArticle = async (marked: IAddedArticle) => {
  await bookmarksCollection.add(marked);
};

export const useSaveMutation = (user: TUser) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(saveArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(newsQueryKeys.bookmark(user));
    },
  });
  return {mutation};
};
