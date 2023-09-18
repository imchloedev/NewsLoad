import React, {useState} from 'react';
import styled from 'styled-components/native';
import {SignInScreenProps} from '@screens/@types';
import {CustomButton, CustomInput} from '@components/auth';
import {Title} from '@components/common';
import {
  handleFirebaseAuthError,
  isFirebaseAuthError,
  onSignIn,
} from '~/apis/auth';
import {validateEmail, validatePassword, showAlert} from '~/utils';

const SignInScreen = ({navigation}: SignInScreenProps) => {
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
        <Title
          titleRole="main"
          title="Sign In"
          styles={{textAlign: 'center'}}
        />
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
    </SContainer>
  );
};

export default SignInScreen;

export const SContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SSubCopy = styled.Text`
  font-family: 'Poppins-Regular';
  margin-top: 5px;
  color: ${({theme}) => theme.style.colors.text};
  text-align: center;
`;

export const STitleWrapper = styled.View`
  padding: 0px 18px 60px 18px;
`;

const SButtonGroup = styled.View`
  padding-top: 40px;
  display: flex;
  gap: 20px;
`;
