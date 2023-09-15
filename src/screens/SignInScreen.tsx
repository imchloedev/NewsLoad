import React, {useState} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import {SignInScreenProps} from '@screens/@types';
import {CustomButton, CustomInput} from '@components/auth';
import useThemeColors from '~/hooks/useThemeColors';
import {validateEmail, validatePassword} from '~/utils/validateAuth';
import {onSignIn} from '~/apis/auth';

const SignInScreen = ({navigation}: SignInScreenProps) => {
  const theme = useThemeColors();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const isOkayLogin =
    validateEmail(userInfo.email) && validatePassword(userInfo.password);

  const handleChange = (text: string, name: string) => {
    setUserInfo({...userInfo, [name]: text});
  };

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await onSignIn(userInfo.email, userInfo.password);
      setUserInfo({email: '', password: ''});
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyles = StyleSheet.create({
    wrapper: {
      borderStyle: 'solid',
      borderBottomWidth: 1,
      marginHorizontal: 18,
      marginVertical: 20,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      flexGrow: 1,
      flexShrink: 1,
      color: theme.colors.text,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
  });

  const buttonStyles = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.primary,
      height: 44,
      borderRadius: 20,
      marginLeft: 18,
      marginRight: 18,
    },
    text: {
      fontSize: 16,
      color: theme.colors.white,
    },
  });

  const updatedButtonStyles = StyleSheet.create({
    wrapper: {
      ...buttonStyles.wrapper,
      backgroundColor: 'white',
    },
    text: {
      ...buttonStyles.text,
      color: theme.colors.middleGray,
    },
  });

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
          isValid={validateEmail(userInfo.email)}
          placeholder="Email"
          styles={inputStyles}
          handleChange={handleChange}
          secureTextEntry={false}
          returnKeyType={'next'}
        />
        <CustomInput
          name="password"
          isValid={validatePassword(userInfo.password)}
          placeholder="Password"
          styles={inputStyles}
          handleChange={handleChange}
          secureTextEntry={true}
          returnKeyType={'next'}
        />
        <SButtonGroup>
          <CustomButton
            styles={buttonStyles}
            title="Sign In"
            onPress={isOkayLogin ? handleSignIn : undefined}
          />
          <CustomButton
            styles={updatedButtonStyles}
            title="Sign Up"
            onPress={() => navigation.navigate('SignUp')}
          />
        </SButtonGroup>
      </View>
    </SWrapper>
  );
};

export default SignInScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

const STitleWrapper = styled.View`
  padding: 0 18px;
  position: absolute;
  top: 50%;
  left: 0;
`;

const SButtonGroup = styled.View`
  padding-top: 20px;
  display: flex;
  gap: 20px;
`;
