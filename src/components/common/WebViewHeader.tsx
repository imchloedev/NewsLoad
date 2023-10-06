import React from 'react';
import {Platform, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useThemeColors from '~/hooks/useThemeColors';

interface IWebViewHeaderProps {
  onPress: () => void;
  url: string;
  canGoBack: boolean;
  copyToClipboard: () => void;
}

const WebViewHeader = ({
  onPress,
  url,
  canGoBack,
  copyToClipboard,
}: IWebViewHeaderProps) => {
  const theme = useThemeColors();
  const inset = useSafeAreaInsets();
  const statusBarHeight =
    Platform.OS === 'ios' ? inset.top : StatusBar.currentHeight;

  return (
    <SHeaderWrapper statusBarHeight={statusBarHeight}>
      <Icon
        name={canGoBack ? 'arrow-back-outline' : 'close-outline'}
        size={22}
        color={theme.colors.text}
        onPress={onPress}
      />
      <SUrlCopy>{url}</SUrlCopy>
      <Icon
        name="copy-outline"
        size={22}
        color={theme.colors.text}
        onPress={copyToClipboard}
      />
    </SHeaderWrapper>
  );
};

export default WebViewHeader;

const SHeaderWrapper = styled.View<{statusBarHeight: number | undefined}>`
  ${({theme}) => theme.variables.flex('row', 'space-between', 'center')}
  padding: ${({statusBarHeight}) =>
    statusBarHeight && Platform.OS === 'android'
      ? '0 18px'
      : `${statusBarHeight}px 18px 0 18px`};
  height: ${({statusBarHeight}) => statusBarHeight && statusBarHeight + 50}px;
  background-color: ${({theme}) => theme.style.colors.background};
`;

const SUrlCopy = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex-shrink: 1;
  width: 70%;
  font-family: 'Poppins-Regular';
  font-size: 12px;
  color: ${({theme}) => theme.style.colors.text};
  text-align: center;
`;
