import React from 'react';
import {Button, Text, View} from 'react-native';
import {onSignOut} from '~/apis/auth';
import {ProfileScreenProps} from './@types';

const ProfileScreen = ({navigation}: ProfileScreenProps) => {
  const onLeave = async () => {
    try {
      await onSignOut();
      navigation.navigate('Home');
    } catch (error: unknown) {
      // showAlert('Error', 'Please try again later');
    }
  };

  return (
    <View>
      <Text>Profile</Text>
      <Button title="log out" onPress={onLeave} />
    </View>
  );
};

export default ProfileScreen;