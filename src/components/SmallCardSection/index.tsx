import React from 'react';
import {FlatList, View} from 'react-native';
import {useNewsQuery} from '~/hooks/useNewsQuery';
import SmallCardItem from '../SmallCardItem';

const SmallCardSection = () => {
  const {news} = useNewsQuery(5, 20);
  console.log(news?.length);

  return (
    <View>
      <FlatList
        data={news}
        renderItem={({item}) => <SmallCardItem article={item} />}
      />
    </View>
  );
};

export default SmallCardSection;
