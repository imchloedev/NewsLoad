import auth from '@react-native-firebase/auth';
import {TUser} from '~/store/atom';

export const onSignUp = async (email: string, password: string) => {
  return await auth().createUserWithEmailAndPassword(email, password);
};

export const onSignIn = async (email: string, password: string) => {
  return await auth().signInWithEmailAndPassword(email, password);
};

export const subscribeAuth = (callback: (user: TUser) => void) => {
  return auth().onAuthStateChanged(callback);
};

export const onSignOut = async () => {
  return await auth().signOut();
};
