import React, {useEffect, useRef, useState} from 'react';
import {BackHandler, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import WebView, {WebViewNavigation} from 'react-native-webview';
import Clipboard from '@react-native-clipboard/clipboard';
import {WebViewHeader, Toast} from '@components/common';
import {windowWidth, windowHeight} from '@lib/utils';
import {ScreenProps} from './@types';

const WebViewScreen = ({navigation, route}: ScreenProps<'WebView'>) => {
  const {url} = route.params;
  const [isToastVisible, setIsToastVisible] = useState(false);
  const ref = useRef<WebView | null>(null);
  const [nav, setNav] = useState<WebViewNavigation>();

  useEffect(() => {
    if (!nav) {
      return;
    }
    const {canGoBack} = nav;

    const onPress = () => {
      if (canGoBack) {
        // non-null assertion
        ref.current!.goBack();
        return true;
      } else {
        navigation.goBack();
        return false;
      }
    };

    const copyToClipboard = () => {
      Clipboard.setString(url);
      setIsToastVisible(true);
    };

    navigation.setOptions({
      header: () => (
        <WebViewHeader
          onPress={onPress}
          url={url}
          canGoBack={canGoBack}
          copyToClipboard={copyToClipboard}
        />
      ),
    });

    BackHandler.addEventListener('hardwareBackPress', onPress);

    return () => BackHandler.removeEventListener('hardwareBackPress', onPress);
  }, [nav?.canGoBack]);

  return (
    <SContainer>
      {isToastVisible && (
        <Toast
          text="Link copied to clipboard"
          onClose={() => setIsToastVisible(false)}
          bottom={150}
          isWrapped={false}
        />
      )}
      {url ? (
        <WebView
          ref={ref}
          source={{uri: url}}
          style={{flex: 1}}
          onNavigationStateChange={navState => setNav(navState)}
        />
      ) : (
        <SErrorContainer>
          <SErrorCopy>Wrong Access</SErrorCopy>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SReturnCopy>Return to the previous page</SReturnCopy>
          </TouchableOpacity>
        </SErrorContainer>
      )}
    </SContainer>
  );
};

export default WebViewScreen;

const SContainer = styled.SafeAreaView`
  width: ${windowWidth}px;
  height: ${windowHeight}px;
`;

const SErrorContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const SErrorCopy = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 18px;
  font-weight: 700;
  color: ${({theme}) => theme.style.colors.text};
  padding-bottom: 20px;
`;

const SReturnCopy = styled(SErrorCopy)`
  font-size: 14px;
  color: ${({theme}) => theme.style.colors.primary};
`;
