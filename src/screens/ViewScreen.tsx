import React from 'react';
import {Text, View} from 'react-native';
import {ViewScreenProps} from './@types';

const ViewScreen = ({route}: ViewScreenProps) => {
  const {title, url} = route.params;

  return (
    <View>
      <Text>ViewScreen</Text>
    </View>
  );
};

export default ViewScreen;
