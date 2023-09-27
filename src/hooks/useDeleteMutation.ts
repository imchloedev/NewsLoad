import {useMutation, useQueryClient} from 'react-query';
import {bookmarksCollection} from '~/apis/database';
import {TUser} from '~/types';
import {createUserSavedNewsQueryKey} from '~/utils';

export const deleteArticle = async (id: any) => {
  await bookmarksCollection.doc(id).delete();
};

export const useDeleteMutation = (user: TUser) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(createUserSavedNewsQueryKey(user));
    },
  });

  return {mutation};
};
