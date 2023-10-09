import {useMutation, useQueryClient} from 'react-query';
import {bookmarksCollection} from '~/apis/database';
import {TUser} from '@lib/types';
import {newsQueryKeys} from '@lib/factories/newsQueryKeys';

export const deleteArticle = async (id: any) => {
  await bookmarksCollection.doc(id).delete();
};

export const useDeleteSavedMutation = (user: TUser) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(newsQueryKeys.bookmark(user));
    },
  });

  return {mutation};
};
