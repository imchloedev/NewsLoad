import React from 'react';
import {View, Animated, TouchableOpacity, Text, ScrollView} from 'react-native';
import {
  Layout,
  NavigationState,
} from 'react-native-tab-view/lib/typescript/src/types';
import {styled} from 'styled-components/native';

interface ICustomTabBarProps {
  layout: Layout;
  position: Animated.AnimatedInterpolation<number>;
  navigationState: NavigationState<{key: string; title: string}>;
  jumpTo: (key: string) => void;
}

const CustomTabBar = (props: ICustomTabBarProps) => {
  const {layout, position, jumpTo, navigationState} = props;

  console.log(layout);

  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      {navigationState.routes.map(
        (route: {key: string; title: string}, index: number) => {
          const isFocused = navigationState.index === index;

          return (
            <STabIndicator key={route.key} onPress={() => jumpTo(route.key)}>
              <Text>{route.title}</Text>
            </STabIndicator>
          );
        },
      )}
    </View>
  );
};

export default CustomTabBar;

const STabIndicator = styled.TouchableOpacity`
  width: auto;
  height: 40px;
  padding: 0 10px;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;
