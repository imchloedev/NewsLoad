import React, {useState} from 'react';
import styled from 'styled-components/native';
import {CustomButton, CustomInput} from '@components/auth';
import {LoadingSpinner, Title} from '@components/common';
import {
  handleFirebaseAuthError,
  isFirebaseAuthError,
  onSignIn,
} from '~/apis/auth';
import {validateEmail, validatePassword, showAlert} from '~/utils';
import {ScreenProps} from './@types';

const SignInScreen = ({navigation}: ScreenProps<'SignIn'>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const {email, password} = userInfo;
  const isOkayLogin = validateEmail(email) && validatePassword(password);

  const handleChange = (text: string, name: string) => {
    setUserInfo({...userInfo, [name]: text});
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await onSignIn(email, password);
      setUserInfo({email: '', password: ''});
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
        <Title titleRole="main" title="Sign In" />
        <SSubCopy>To sign in please enter email and password</SSubCopy>
      </STitleWrapper>

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
      <SButtonGroup>
        <CustomButton
          title="Sign In"
          onPress={isOkayLogin ? handleSignIn : undefined}
        />
        <CustomButton
          active={false}
          title="Sign Up"
          onPress={() => navigation.navigate('SignUp')}
        />
      </SButtonGroup>
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

export default SignInScreen;

export const SContainer = styled.View`
  flex: 1;
  justify-content: center;
`;

const SSubCopy = styled.Text`
  font-family: 'Poppins-Regular';
  margin-top: 5px;
  color: ${({theme}) => theme.style.colors.text};
`;

export const STitleWrapper = styled.View`
  padding: 0px 18px 60px 18px;
`;

const SButtonGroup = styled.View`
  padding-top: 40px;
  ${({theme}) => theme.variables.flex('column', 'flex-start', 'flex-start')}
  gap: 20px;
`;
