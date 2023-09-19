import {useMutation, useQueryClient} from 'react-query';
import {bookmarksCollection} from '~/apis/database';

export const deleteArticle = async (id: any) => {
  await bookmarksCollection.doc(id).delete();
};

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['saved']);
    },
  });

  return {mutation};
};
