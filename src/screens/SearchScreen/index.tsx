import React, {useState} from 'react';
import {Text, TextInput, View, useWindowDimensions} from 'react-native';
import {SceneMap, TabView, TabBar, Route} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {styled} from 'styled-components/native';
import MainTitle from '@components/MainTitle';
import FirstTab from '@components/Tabs/FirstTab';
import FourthTab from '@components/Tabs/FourthTab';
import SecondTab from '@components/Tabs/SecondTab';
import ThirdTab from '@components/Tabs/ThirdTab';

const renderScene = SceneMap({
  first: FirstTab,
  second: SecondTab,
  third: ThirdTab,
  fourth: FourthTab,
});

const SearchScreen = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Business'},
    {key: 'second', title: 'Entertainment'},
    {key: 'third', title: 'Health'},
    {key: 'fourth', title: 'Science'},
  ]);

  return (
    <View style={{height: '100%'}}>
      <STtileWrapper>
        <MainTitle title="Discover" />
      </STtileWrapper>

      <SSearchInputWrapper>
        <Icon name="search-outline" size={16} color={'gray'} />
        <SSearchInput />
      </SSearchInputWrapper>

      <TabView
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        renderScene={renderScene}
        initialLayout={{width: layout.width}}
        renderTabBar={props => (
          <TabBar
            {...props}
            scrollEnabled={true}
            tabStyle={{width: 'auto'}}
            indicatorStyle={{backgroundColor: 'orange'}}
            labelStyle={{
              textTransform: 'capitalize',
              color: 'black',
              paddingLeft: 12,
              paddingRight: 12,
            }}
            activeColor={'orange'}
            style={{backgroundColor: 'transparent'}}
          />
        )}
      />
    </View>
  );
};

export default SearchScreen;

const STtileWrapper = styled.View`
  padding: 20px 18px;
`;

const SSearchInputWrapper = styled.View`
  height: 40px;
  background-color: white;
  border-radius: 20px;
  margin: 10px 18px 20px 18px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10;
`;

const SSearchInput = styled.TextInput.attrs({
  placeholder: 'Search',
  color: 'gray',
})`
  height: 40px;
`;
