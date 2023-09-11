import React from 'react';
import {FlatList} from 'react-native';
import SmallCardItem from '@components/SmallCardItem';
import {useNewsByCategoryQuery} from '~/hooks/useNewsByCategoryQuery';
import {STabContainer} from '../FirstTab';

const FourthTab = () => {
  const {news} = useNewsByCategoryQuery('science');

  return (
    <STabContainer>
      <FlatList
        data={news}
        renderItem={({item}) => <SmallCardItem article={item} />}
      />
    </STabContainer>
  );
};

export default FourthTab;
