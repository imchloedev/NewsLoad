import React from 'react';
import {FlatList} from 'react-native';
import {STabContainer} from '../FirstTab';
import {useNewsByCategoryQuery} from '~/hooks/useNewsByCategoryQuery';
import SmallCardItem from '@components/SmallCardItem';

const ThirdTab = () => {
  const {news} = useNewsByCategoryQuery('health');

  return (
    <STabContainer>
      <FlatList
        data={news}
        renderItem={({item}) => <SmallCardItem article={item} />}
      />
    </STabContainer>
  );
};

export default ThirdTab;
