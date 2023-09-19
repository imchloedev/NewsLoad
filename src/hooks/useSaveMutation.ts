import {useMutation, useQueryClient} from 'react-query';
import {bookmarksCollection} from '~/apis/database';

const saveArticle = async (marked: any) => {
  await bookmarksCollection.add(marked);
};

export const useSaveMutation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(saveArticle, {
    onSuccess: () => {
      queryClient.invalidateQueries(['saved']);
    },
  });
  return {mutation};
};
