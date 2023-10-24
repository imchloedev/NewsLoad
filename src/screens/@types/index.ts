import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IArticle} from '~/lib/types';

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Search: undefined;
  View: {article: IArticle};
  WebView: {url: string};
  Bookmark: undefined;
  Discover: undefined;
  Channel: {channel: string};
};

export type RootStackParamList = {
  MainNavi: NavigatorScreenParams<MainStackParamList>;
};

export type ScreenProps<T extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, T>;
