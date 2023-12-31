import React from 'react';
import {StatusBar, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {MainStackParamList} from '@screens/@types';
import {SearchInput} from '@components/common';
import useThemeColors from '@lib/hooks/common/useThemeColors';

interface ICustomHeaderProps {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Search'>;
  setText?: React.Dispatch<React.SetStateAction<string>>;
}

const CustomHeader = ({navigation, setText}: ICustomHeaderProps) => {
  const theme = useThemeColors();
  const inset = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'ios' ? inset.top : StatusBar.currentHeight;

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
  padding: ${({statusBarHeight}) =>
    statusBarHeight && `${statusBarHeight}px 18px 0 18px`};
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
