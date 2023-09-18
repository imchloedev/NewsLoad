import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
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

export const isFirebaseAuthError = (
  error: unknown,
): error is FirebaseAuthTypes.NativeFirebaseAuthError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof (error as FirebaseAuthTypes.NativeFirebaseAuthError).code ===
      'string'
  );
};

// handling auth error
export const handleFirebaseAuthError = (
  error: FirebaseAuthTypes.NativeFirebaseAuthError,
) => {
  switch (error.code) {
    case 'auth/user-not-found' || 'auth/invalid-password':
      return 'Email or password is incorrect.';
    case 'auth/email-already-exists':
      return 'Email is already in use.';
    case 'auth/internal-error':
      return 'Invalid request.';
    default:
      return 'Please try again.';
  }
};
