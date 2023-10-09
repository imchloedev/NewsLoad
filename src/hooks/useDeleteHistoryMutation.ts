import {useMutation, useQueryClient} from 'react-query';
import {viewedListCollection} from '~/apis/database';
import {TUser} from '~/types';
import {createUserViewedNewsQueryKey} from '~/utils';

const clearHistory = async (user: TUser) => {
  const querySnapshot = await viewedListCollection
    .where('userId', '==', user?.uid)
    .get();
  querySnapshot.forEach(documentSnapshot => documentSnapshot.ref.delete());
};

export const useDeleteHistoryMutation = (user: TUser) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(clearHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(createUserViewedNewsQueryKey(user));
    },
  });

  return {mutation};
};
