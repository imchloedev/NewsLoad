import {NavigatorScreenParams} from '@react-navigation/native';

export type LoginStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  View: undefined;
  Auth: NavigatorScreenParams<LoginStackParamList>;
  Profile: undefined;
  Search: undefined;
};
