import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {useNewsByTitleQuery} from '~/hooks/useNewsByTitle';
import {MainStackParamList} from '../@types';
import axios from 'axios';
import {useInfiniteQuery} from 'react-query';

type ViewScreenProps = NativeStackScreenProps<MainStackParamList, 'View'>;

const ViewScreen = ({route}: ViewScreenProps) => {
  const {title, url} = route.params;

  return (
    <View>
      <Text>ViewScreen</Text>
    </View>
  );
};

export default ViewScreen;
