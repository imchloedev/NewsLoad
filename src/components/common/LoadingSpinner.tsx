import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {CSSProp} from 'styled-components';

interface ILoadingSpinnerProps {
  style?: CSSProp;
}

const LoadingSpinner = ({style}: ILoadingSpinnerProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator color={'#1cd760'} />
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
});
