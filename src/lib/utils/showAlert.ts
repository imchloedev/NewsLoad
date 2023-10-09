import {Alert} from 'react-native';

export const showAlert = (title: string, message: string) => {
  return Alert.alert(title, message, [{text: 'OK'}]);
};
