import {TUser} from '~/types';

export const createUserNewsByCategoryQueryKey = (
  user: TUser,
  category: string,
) => {
  return ['news', 'headlines', {category: category}, {userId: user?.uid}];
};

export const createUserNewsByChannelQueryKey = (
  user: TUser,
  channel: string,
) => {
  return ['news', {channel: channel}, {userId: user?.uid}];
};

export const createUserSavedNewsQueryKey = (user: TUser) => {
  return ['news', 'saved', {userId: user?.uid}];
};

export const createUserSearchQueryKey = (user: TUser, query: string) => {
  return ['news', 'headlines', {keyword: query}, {userId: user?.uid}];
};
