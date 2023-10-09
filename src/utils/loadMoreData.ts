import {FetchNextPageOptions, UseInfiniteQueryResult} from 'react-query';

export const loadMoreData = (
  hasMore: boolean | undefined,
  fetchMore: (
    options?: FetchNextPageOptions,
  ) => Promise<UseInfiniteQueryResult>,
) => {
  if (hasMore) {
    fetchMore();
  }
};
