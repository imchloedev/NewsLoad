import {NavigatorScreenParams} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type LoginStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  View: {title: string; url: string};
  Auth: NavigatorScreenParams<LoginStackParamList>;
  Profile: undefined;
  Search: undefined;
};

export type HomeScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Home'
>;

export type ProfileScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Profile'
>;

export type SearchScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'Search'
>;

export type ViewScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'View'
>;

export type SignInScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'SignIn'
>;

export type SignUpScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'SignUp'
>;
