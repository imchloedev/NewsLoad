import firestore from '@react-native-firebase/firestore';

export const bookmarksCollection = firestore().collection('Bookmarks');
