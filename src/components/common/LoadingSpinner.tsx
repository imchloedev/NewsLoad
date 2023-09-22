import React, {useEffect} from 'react';
import {StyleSheet, Animated, View, Easing} from 'react-native';
import {CSSProp} from 'styled-components';

interface ILoadingSpinnerProps {
  style?: CSSProp;
}

const LoadingSpinner = ({style}: ILoadingSpinnerProps) => {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.View style={[styles.spinner, {transform: [{rotate: spin}]}]} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: 'transparent',
  },
  spinner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#1cd760',
    borderTopColor: 'transparent',
    animationDuration: '1s',
  },
});
