import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {atom} from 'recoil';

export interface IArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export type TUser = FirebaseAuthTypes.User | null;

export const userState = atom<TUser>({
  key: 'userState',
  default: null,
});
