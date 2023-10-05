import {useMutation, useQueryClient} from 'react-query';
import {viewedListCollection} from '~/apis/database';
import {IAddedArticle, TUser} from '~/types';
import {createUserViewedNewsQueryKey} from '~/utils';

interface IUpdateParams {
  id: string;
  updated: IAddedArticle;
}

// update
const updateViewedList = async ({id, updated}: IUpdateParams) => {
  await viewedListCollection.doc(id).update(updated);
};

export const useUpdateViewListMutation = (user: TUser) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(updateViewedList, {
    onSuccess: () => {
      queryClient.invalidateQueries(createUserViewedNewsQueryKey(user));
    },
  });

  return {mutation};
};
