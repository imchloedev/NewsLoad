import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IArticle} from '~/store/atom';

export type DisCoverStackParamList = {
  Discover: undefined;
  View: {article: IArticle};
  WebView: {url: string};
  Search: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Search: undefined;
  View: {article: IArticle};
  WebView: {url: string};
};

export type RootStackParamList = {
  MainNavi: NavigatorScreenParams<MainStackParamList>;
  DiscoverNavi: NavigatorScreenParams<DisCoverStackParamList>;
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
  DisCoverStackParamList,
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
