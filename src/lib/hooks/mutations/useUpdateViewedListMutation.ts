import {useMutation, useQueryClient} from 'react-query';
import {viewedListCollection} from '~/apis/database';
import {IAddedArticle, TUser} from '@lib/types';
import {newsQueryKeys} from '@lib/factories/newsQueryKeys';

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
      queryClient.invalidateQueries(newsQueryKeys.bookmark(user));
    },
  });

  return {mutation};
};
