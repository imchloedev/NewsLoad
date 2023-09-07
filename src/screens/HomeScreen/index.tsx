import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {MainStackParamList} from '../@types';
import {useNewsQuery} from '~/hooks/useNewsQuery';
import Config from 'react-native-config';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [user, setUser] = useState(true);

  const {news} = useNewsQuery();
  console.log(news);

  // console.log(Config);

  return (
    <View>
      <Button
        title="프로필로 이동하기"
        onPress={() =>
          user
            ? navigation.navigate('Profile')
            : navigation.navigate('Auth', {screen: 'SignIn'})
        }
      />
      <Text>Home</Text>
      {news.map(li => (
        <Text>{li.title}</Text>
      ))}
    </View>
  );
};

export default HomeScreen;
