import {FirebaseAuthTypes} from '@react-native-firebase/auth';

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

export interface ISavedArticle {
  id: string;
  userId: string;
  article: IArticle;
  isSaved: boolean;
}

export interface ChildrenProps {
  children: React.JSX.Element;
}
