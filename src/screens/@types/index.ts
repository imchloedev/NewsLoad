import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IArticle} from '~/types';

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
};

export type RootStackParamList = {
  MainNavi: NavigatorScreenParams<MainStackParamList>;
};

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;

export type ProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Profile'
>;

export type DiscoverScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Discover'
>;

export type SignInScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'SignIn'
>;

export type SignUpScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'SignUp'
>;

export type SearchScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Search'
>;

export type ViewScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'View'
>;

export type WebViewScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'WebView'
>;

export type BookmarkScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Bookmark'
>;
