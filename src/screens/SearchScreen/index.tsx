import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Text, TextInput, View, useWindowDimensions} from 'react-native';
import {SceneMap, TabView, TabBar, Route} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {styled} from 'styled-components/native';
import MainTitle from '~/components/common/Title';
import FirstTab from '@components/Tabs/FirstTab';
import FourthTab from '@components/Tabs/FourthTab';
import SecondTab from '@components/Tabs/SecondTab';
import ThirdTab from '@components/Tabs/ThirdTab';
import CustomButton from '~/components/common/CustomButton';
import {MainStackParamList} from '../@types';
import useThemeColors from '~/hooks/useThemeColors';
import {variables} from '../../styles/theme';

type SearchScreenProps = NativeStackScreenProps<MainStackParamList, 'Search'>;

const SearchScreen = ({navigation}: SearchScreenProps) => {
  const theme = useThemeColors();
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Business'},
    {key: 'second', title: 'Entertainment'},
    {key: 'third', title: 'Health'},
    {key: 'fourth', title: 'Science'},
  ]);

  const onMoveToScreen = (title: string, url: string) => {
    navigation.navigate('View', {title: title, url: url});
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
        <MainTitle titleRole="main" title="Discover" />
      </STtileWrapper>

      <SSearchInputWrapper>
        <SSearchInputFirstGroup>
          <Icon name="search-outline" size={16} color={'gray'} />
          <SSearchInput />
        </SSearchInputFirstGroup>
        <CustomButton
          title="Search"
          onPress={() => console.log('Go')}
          styles={{width: 'auto', height: '30px'}}
        />
      </SSearchInputWrapper>

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
            }}
            activeColor={theme.colors.primary}
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
  background-color: ${({theme}) => theme.style.colors.background};
  border-radius: 20px;
  margin: 10px 18px 20px 18px;
  padding: 0 10px;
  ${({theme}) => theme.variables.flex('row', 'space-between', 'center')}
  /* display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between; */
  gap: 10px;
`;

const SSearchInputFirstGroup = styled.View`
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')}
  /* display: flex;
  flex-direction: row;
  align-items: center; */
  gap: 10px;
  flex-grow: 1;
  flex-shrink: 1;
`;

const SSearchInput = styled.TextInput.attrs({
  placeholder: 'Search',
  color: 'gray',
})`
  flex-grow: 1;
  flex-shrink: 1;
  height: 40px;
`;
