import React, {useState} from 'react';
import {View} from 'react-native';
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
    <SWrapper>
      <STitleContainer>
        <STitleWrapper>
          <STitle>Sign In</STitle>
          <SSubCopy>To sign in please enter email and password</SSubCopy>
        </STitleWrapper>
      </STitleContainer>

      <View>
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
      </View>
    </SWrapper>
  );
};

export default SignInScreen;

export const SWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding-bottom: 100px;
`;

export const STitleContainer = styled.View`
  width: ${windowWidth}px;
  height: ${windowHeight / 2}px;
  background-color: ${({theme}) => theme.style.colors.white};
  border-radius: 0 0 60px 60px;
  position: relative;
`;

export const STitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.style.colors.primary};
`;

const SSubCopy = styled.Text`
  margin-top: 5px;
  color: ${({theme}) => theme.style.colors.primary};
`;

export const STitleWrapper = styled.View`
  padding: 0 18px;
  position: absolute;
  top: 50%;
  left: 0;
`;

const SButtonGroup = styled.View`
  padding-top: 40px;
  display: flex;
  gap: 20px;
`;
