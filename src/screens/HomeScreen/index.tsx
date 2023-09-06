import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState(true);

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
    </View>
  );
};

export default HomeScreen;
