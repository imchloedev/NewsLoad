import React, {useState} from 'react';
import styled from 'styled-components/native';
import {SContainer, STitleWrapper} from './SignInScreen';
import {CustomButton, CustomInput} from '@components/auth';
import {Title, LoadingSpinner} from '@components/common';
import {showAlert, validateEmail, validatePassword} from '~/utils';
import {
  onSignUp,
  isFirebaseAuthError,
  handleFirebaseAuthError,
} from '~/apis/auth';
import {ScreenProps} from './@types';

const SignUpScreen = ({navigation}: ScreenProps<'SignUp'>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const {fullName, email, password} = userInfo;
  const isNameValid = fullName.length > 0;
  const isOkaySignUp =
    isNameValid && validateEmail(email) && validatePassword(password);

  const handleChange = (text: string, name: string) => {
    setUserInfo({...userInfo, [name]: text});
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await onSignUp(email, password);
      setUserInfo({fullName: '', email: '', password: ''});
      navigation.navigate('Home');
    } catch (err: unknown) {
      if (isFirebaseAuthError(err)) {
        const message = handleFirebaseAuthError(err);
        showAlert('Failed', message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SContainer>
      <STitleWrapper>
        <Title titleRole="main" title="Create an account" />
      </STitleWrapper>
      <CustomInput
        name="fullName"
        isValid={isNameValid}
        placeholder="Full Name"
        handleChange={handleChange}
        secureTextEntry={false}
        returnKeyType={'next'}
        autoCapitalize={'words'}
      />
      <CustomInput
        name="email"
        isValid={validateEmail(email)}
        placeholder="Email"
        handleChange={handleChange}
        secureTextEntry={false}
        returnKeyType={'next'}
        autoCapitalize={'none'}
      />
      <CustomInput
        name="password"
        isValid={validatePassword(password)}
        placeholder="Password"
        handleChange={handleChange}
        secureTextEntry={true}
        returnKeyType={'next'}
        autoCapitalize={'none'}
      />
      <SButtonWrapper>
        <CustomButton
          title="Sign Up"
          onPress={isOkaySignUp ? handleSignUp : undefined}
        />
      </SButtonWrapper>
      {isLoading && (
        <LoadingSpinner
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
      )}
    </SContainer>
  );
};

export default SignUpScreen;

const SButtonWrapper = styled.View`
  padding-top: 40px;
`;
