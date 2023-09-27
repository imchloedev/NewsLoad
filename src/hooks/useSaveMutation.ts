import {useMutation, useQueryClient} from 'react-query';
import {bookmarksCollection} from '~/apis/database';
import {IAddedArticle, ISavedArticle, TUser} from '~/types';
import {createUserSavedNewsQueryKey} from '~/utils';

const saveArticle = async (marked: IAddedArticle) => {
  await bookmarksCollection.add(marked);
};

export const useSaveMutation = (user: TUser) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(saveArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(createUserSavedNewsQueryKey(user));
    },
  });
  return {mutation};
};
