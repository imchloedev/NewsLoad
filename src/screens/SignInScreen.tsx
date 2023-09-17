import React, {useState} from 'react';
import styled from 'styled-components/native';
import {SignInScreenProps} from '@screens/@types';
import {CustomButton, CustomInput} from '@components/auth';
import {onSignIn} from '~/apis/auth';
import {
  windowWidth,
  windowHeight,
  validateEmail,
  validatePassword,
} from '~/utils';
import {Title} from '~/components/common';

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
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SContainer>
      <SWrapper>
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
      </SWrapper>
    </SContainer>
  );
};

export default SignInScreen;

export const SContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const SWrapper = styled.View`
  width: ${windowWidth}px;
  height: ${windowHeight / 1.5}px;
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 60px 60px 0 0;
  ${({theme}) => theme.variables.flex('column', 'center', 'stretch')};
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
  display: flex;
  gap: 20px;
`;
