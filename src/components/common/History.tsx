import React from 'react';
import {FlatList} from 'react-native';
import auth from '@react-native-firebase/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ListFooter, HistoryItem} from '@components/common';
import {useViewedNewsQuery} from '~/hooks/useViewedNewsQuery';
import {getCardStyle, windowWidth} from '~/utils';
import {MainStackParamList} from '~/screens/@types';

interface IHistoryProps {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Profile'>;
}

const History = ({navigation}: IHistoryProps) => {
  const currentUser = auth().currentUser;
  const {viewed} = useViewedNewsQuery(currentUser);
  const {gap, pageWidth} = getCardStyle(18, windowWidth / 3);

  return (
    <>
      <FlatList
        data={viewed}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={pageWidth}
        decelerationRate="fast"
        snapToAlignment="start"
        contentContainerStyle={{
          paddingRight: gap,
          marginLeft: gap / 2,
        }}
        renderItem={({item}) => (
          <HistoryItem
            article={item.article}
            onMoveToScreen={() =>
              navigation.navigate('View', {article: item.article})
            }
          />
        )}
      />
      {viewed?.length === 0 && <ListFooter>empty</ListFooter>}
    </>
  );
};

export default History;
