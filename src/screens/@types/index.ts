import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type MainStackParamList = {
  Home: undefined;
  View: {title: string; url: string};
  Profile: undefined;
  Search: undefined;
  SignIn: undefined;
  SignUp: undefined;
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
  MainStackParamList,
  'SignIn'
>;

export type SignUpScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'SignUp'
>;
