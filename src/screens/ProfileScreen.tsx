import React, {Suspense} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';
import styled from 'styled-components/native';
import {LoadingSpinner, Title, History} from '@components/common';
import {CustomButton} from '@components/auth';
import {onSignOut} from '~/apis/auth';
import {ScreenProps} from './@types';
import {showAlert} from '~/utils';
import {useDeleteHistoryMutation} from '~/hooks';

const ProfileScreen = ({navigation}: ScreenProps<'Profile'>) => {
  const currentUser = auth().currentUser;
  const {mutation: onClearHistory} = useDeleteHistoryMutation(currentUser);

  const onLeave = async () => {
    try {
      await onSignOut();
      navigation.navigate('Home');
    } catch (error: unknown) {
      showAlert('Error', 'Please try again later');
    }
  };

  return (
    <ScrollView>
      <STitleWrapper>
        <Title titleRole="main" title="Profile" />
      </STitleWrapper>

      <STextWrapper>
        <SText>Welcome!</SText>
        <SEmailCopy>{currentUser?.email?.split('@')[0]}</SEmailCopy>
      </STextWrapper>

      <SHistoryTitleWrapper>
        <Title titleRole="sub" title="Recently viewed" />
        <TouchableOpacity onPress={() => onClearHistory.mutate(currentUser)}>
          <SClearText>clear</SClearText>
        </TouchableOpacity>
      </SHistoryTitleWrapper>

      <Suspense fallback={<LoadingSpinner />}>
        <History navigation={navigation} />
      </Suspense>

      <SBtnWrapper>
        <CustomButton title="Sign out" onPress={onLeave} active={false} />
      </SBtnWrapper>
    </ScrollView>
  );
};

export default ProfileScreen;

const STitleWrapper = styled.View`
  padding: 20px 18px;
`;

const SHistoryTitleWrapper = styled(STitleWrapper)`
  ${({theme}) => theme.variables.flex('row', 'space-between', 'center')}
`;

const STextWrapper = styled.View`
  ${({theme}) => theme.variables.flex('column', 'center', 'center')}
  gap: 10px;
  padding: 20px 18px 40px 18px;
`;

const SText = styled.Text`
  font-size: 14px;
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.text};
`;

const SEmailCopy = styled(SText)`
  font-family: 'Poppins-Bold';
  text-transform: capitalize;
  font-size: 18px;
`;

const SBtnWrapper = styled.View`
  padding-top: 60px;
`;

const SClearText = styled(SText)`
  font-size: 12px;
  color: ${({theme}) => theme.style.colors.middleGray};
`;
