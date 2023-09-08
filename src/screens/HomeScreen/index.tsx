import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {MainStackParamList} from '../@types';
import {styled} from 'styled-components/native';
import LargeCardSection from '~/components/LargeCardSection';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [user, setUser] = useState(true);

  return (
    <ScrollView>
      <LargeCardSection />
    </ScrollView>
  );
};

export default HomeScreen;

{
  /* <Button
        title="프로필로 이동하기"
        onPress={() =>
          user
            ? navigation.navigate('Profile')
            : navigation.navigate('Auth', {screen: 'SignIn'})
        }
      /> */
}
{
  /* <Text>Home</Text> */
}
