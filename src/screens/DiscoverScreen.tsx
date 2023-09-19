import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import styled from 'styled-components/native';
import {FirstTab, SecondTab, ThirdTab, FourthTab} from '@components/Tabs';
import {SearchInput, Title} from '@components/common';
import useThemeColors from '@hooks/useThemeColors';
import {DiscoverScreenProps} from '@screens/@types';
import {IArticle} from '~/types';

const DiscoverScreen = ({navigation}: DiscoverScreenProps) => {
  const theme = useThemeColors();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Business'},
    {key: 'second', title: 'Entertainment'},
    {key: 'third', title: 'Health'},
    {key: 'fourth', title: 'Science'},
  ]);

  const onMoveToScreen = (article: IArticle) => {
    navigation.navigate('View', {article});
  };

  type TRoute = {
    route: {
      key: string;
      title: string;
    };
  };

  const renderScene = ({route}: TRoute) => {
    switch (route.key) {
      case 'first':
        return <FirstTab onMoveToScreen={onMoveToScreen} />;
      case 'second':
        return <SecondTab onMoveToScreen={onMoveToScreen} />;
      case 'third':
        return <ThirdTab onMoveToScreen={onMoveToScreen} />;
      case 'fourth':
        return <FourthTab onMoveToScreen={onMoveToScreen} />;
      default:
        return null;
    }
  };

  return (
    <View style={{height: '100%'}}>
      <STtileWrapper>
        <Title titleRole="main" title="Discover" />
      </STtileWrapper>

      <SInputContainer>
        <SearchInput onPressIn={() => navigation.navigate('Search')} />
      </SInputContainer>

      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        initialLayout={{width: layout.width}}
        lazy={true}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled={true}
            tabStyle={{width: 'auto'}}
            indicatorStyle={{backgroundColor: theme.colors.primary}}
            labelStyle={{
              textTransform: 'capitalize',
              color: theme.colors.text,
              paddingLeft: 12,
              paddingRight: 12,
              fontFamily: 'Poppins-Regular',
            }}
            activeColor={theme.colors.primary}
            style={{backgroundColor: 'transparent'}}
          />
        )}
      />
    </View>
  );
};

export default DiscoverScreen;

const STtileWrapper = styled.View`
  padding: 20px 18px;
`;

const SInputContainer = styled.View`
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 20px;
  margin: 10px 18px 20px 18px;
  padding: 0 10px;
`;
