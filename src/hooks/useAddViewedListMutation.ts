import {useMutation, useQueryClient} from 'react-query';
import {viewedListCollection} from '~/apis/database';
import {IAddedArticle, TUser} from '~/types';
import {createUserViewedNewsQueryKey} from '~/utils';

// add
const addViewedList = async (newArticle: IAddedArticle) => {
  await viewedListCollection.add(newArticle);
};

export const useAddViewedListMutation = (user: TUser) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addViewedList, {
    onSuccess: () => {
      queryClient.invalidateQueries(createUserViewedNewsQueryKey(user));
    },
  });

  return {mutation};
};
