import React, {useState} from 'react';
import styled from 'styled-components/native';
import {SContainer, STitleWrapper} from './SignInScreen';
import {CustomButton, CustomInput} from '@components/auth';
import {Title} from '@components/common';
import {validateEmail, validatePassword} from '~/utils';
import {onSignUp} from '~/apis/auth';
import {SignUpScreenProps} from './@types';

const SignUpScreen = ({navigation}: SignUpScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const {fullName, email, password} = userInfo;
  const isOkaySignUp = validateEmail(email) && validatePassword(password);

  const handleChange = (text: string, name: string) => {
    setUserInfo({...userInfo, [name]: text});
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await onSignUp(email, password);
      setUserInfo({fullName: '', email: '', password: ''});
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SContainer>
      <STitleWrapper>
        <Title
          titleRole="main"
          title="Create an account"
          styles={{textAlign: 'center'}}
        />
      </STitleWrapper>
      <CustomInput
        name="name"
        isValid={fullName.length > 0}
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
    </SContainer>
  );
};

export default SignUpScreen;

const SButtonWrapper = styled.View`
  padding-top: 40px;
`;
