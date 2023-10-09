import {TUser} from '~/lib/types';

export const newsQueryKeys = {
  base: ['news'] as const,
  headlines: () => [...newsQueryKeys.base, 'headlines'] as const,
  category: (category: string, user: TUser) =>
    [
      ...newsQueryKeys.base,
      'headlines',
      {category: category},
      {userId: user?.uid},
    ] as const,
  channel: (channel: string, user: TUser) =>
    [
      ...newsQueryKeys.base,
      'headlines',
      {channel: channel},
      {userId: user?.uid},
    ] as const,
  search: (query: string, user: TUser) =>
    [
      ...newsQueryKeys.base,
      'headlines',
      {keyword: query},
      {userId: user?.uid},
    ] as const,
  bookmark: (user: TUser) =>
    [...newsQueryKeys.base, 'saved', {userId: user?.uid}] as const,
  history: (user: TUser) =>
    [...newsQueryKeys.base, 'viewed', {userId: user?.uid}] as const,
};
