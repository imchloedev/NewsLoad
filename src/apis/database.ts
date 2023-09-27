import firestore from '@react-native-firebase/firestore';

export const bookmarksCollection = firestore().collection('Bookmarks');
export const viewedListCollection = firestore().collection('Viewed');
