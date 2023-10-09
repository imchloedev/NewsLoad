import {useMutation, useQueryClient} from 'react-query';
import {viewedListCollection} from '~/apis/database';
import {IAddedArticle, TUser} from '@lib/types';
import {newsQueryKeys} from '@lib/factories/newsQueryKeys';

// add
const addViewedList = async (newArticle: IAddedArticle) => {
  await viewedListCollection.add(newArticle);
};

export const useAddViewedListMutation = (user: TUser) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addViewedList, {
    onSuccess: () => {
      queryClient.invalidateQueries(newsQueryKeys.history(user));
    },
  });

  return {mutation};
};
