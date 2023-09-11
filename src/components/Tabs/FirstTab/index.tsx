import React from 'react';
import {FlatList} from 'react-native';
import {styled} from 'styled-components/native';
import SmallCardItem from '@components/SmallCardItem';
import {useNewsByCategoryQuery} from '~/hooks/useNewsByCategoryQuery';

const FirstTab = () => {
  const {news} = useNewsByCategoryQuery('business');

  return (
    <STabContainer>
      <FlatList
        data={news}
        renderItem={({item}) => <SmallCardItem article={item} />}
      />
    </STabContainer>
  );
};

export default FirstTab;

export const STabContainer = styled.View`
  padding: 20px 18px;
`;
