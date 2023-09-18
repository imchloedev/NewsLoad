import React from 'react';
import {StatusBar, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import styled from 'styled-components/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SearchInput} from '@components/common';
import useThemeColors from '~/hooks/useThemeColors';
import {MainStackParamList} from '@screens/@types';

const statusBarHeight =
  Platform.OS === 'ios' ? getStatusBarHeight(true) : StatusBar.currentHeight;

interface ICustomHeaderProps {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Search'>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
}

const CustomHeader = ({navigation, setText}: ICustomHeaderProps) => {
  const theme = useThemeColors();
  return (
    <SHeader statusBarHeight={statusBarHeight}>
      <Icon
        name="arrow-back-outline"
        size={22}
        color={theme.colors.text}
        onPress={() => navigation.goBack()}
      />
      <SInputContainer>
        <SearchInput
          onChangeText={setText}
          autoFocus={true}
          autoCapitalize="none"
        />
      </SInputContainer>
    </SHeader>
  );
};

export default CustomHeader;

const SHeader = styled.View<{statusBarHeight: number | undefined}>`
  width: 100%;
  height: ${({statusBarHeight}) => statusBarHeight && statusBarHeight + 50}px;
  padding: 50px 18px 0 18px;
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')};
  gap: 20px;
  background-color: ${({theme}) => theme.style.colors.background};
`;

const SInputContainer = styled.View`
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 20px;
  padding: 0 10px;
  flex-shrink: 1;
  flex-grow: 1;
`;
