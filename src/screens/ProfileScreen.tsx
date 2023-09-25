import React from 'react';
import {Button, FlatList, Text, View} from 'react-native';
import {onSignOut} from '~/apis/auth';
import {ScreenProps} from './@types';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import {Title} from '~/components/common';
import ListItem from '~/components/common/ListItem';

const LIST = [
  {id: 1, text: 'ddd'},
  {id: 2, text: 'ddd'},
  {id: 3, text: 'ddd'},
  {id: 4, text: 'ddd'},
  {id: 5, text: 'ddd'},
  {id: 6, text: 'ddd'},
  {id: 7, text: 'ddd'},
  {id: 8, text: 'ddd'},
  {id: 9, text: 'ddd'},
];

const ProfileScreen = ({navigation}: ScreenProps<'Profile'>) => {
  const currentUser = auth().currentUser;

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
      <STitleWrapper>
        <Title titleRole="main" title="Profile" />
      </STitleWrapper>

      <STextWrapper>
        <SText>Hello,</SText>
        <SEmailCopy>{currentUser?.email?.split('@')[0]}</SEmailCopy>
      </STextWrapper>

      <STitleWrapper>
        <Title titleRole="sub" title="Recently viewed" />
      </STitleWrapper>

      <SListWrapper>
        <FlatList
          data={LIST}
          renderItem={({item}) => <ListItem />}
          ItemSeparatorComponent={() => <SSeparator />}
        />
      </SListWrapper>

      <Button title="log out" onPress={onLeave} />
    </View>
  );
};

export default ProfileScreen;

const STitleWrapper = styled.View`
  padding: 20px 18px;
`;

const STextWrapper = styled.View`
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')}
  gap: 10px;
  padding: 10px 18px;
`;

const SText = styled.Text`
  font-size: 18px;
  font-family: 'Poppins-Regular';
`;

const SEmailCopy = styled(SText)`
  font-weight: 700;
  text-transform: capitalize;
`;

const SListWrapper = styled.View`
  padding: 20px 18px;
`;

const SSeparator = styled.View`
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background-color: ${({theme}) => theme.style.colors.gray};
`;
