import React from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import auth from '@react-native-firebase/auth';
import {SmallCardItem} from '@components/card';
import {Title} from '@components/common';
import {useNewsByChannelQuery} from '~/hooks';
import {IArticle} from '~/types';

interface IChannelNewsSectionProps {
  channelName: string;
  onMoveToScreen: (article: IArticle) => void;
}

const ChannelNewsSection = ({
  channelName,
  onMoveToScreen,
}: IChannelNewsSectionProps) => {
  const currentUser = auth().currentUser;
  const {news} = useNewsByChannelQuery(channelName, currentUser);

  const getTitle = (name: string) => {
    const arr = name.split('-');
    return `${arr[0]} news`;
  };

  return (
    <View style={{flex: 1}}>
      {news && (
        <FlatList
          data={news}
          ListHeaderComponent={() => (
            <STitleWrapper>
              <SChannelCopy>Explore</SChannelCopy>
              <Title
                titleRole="main"
                title={getTitle(channelName).toUpperCase()}
              />
            </STitleWrapper>
          )}
          renderItem={({item}) => (
            <SCardItemWrapper>
              <SmallCardItem article={item} onMoveToScreen={onMoveToScreen} />
            </SCardItemWrapper>
          )}
        />
      )}
    </View>
  );
};

export default ChannelNewsSection;

const SText = styled.Text`
  font-family: 'Poppins-Regular';
`;

const STitleWrapper = styled.View`
  padding: 20px 18px;
`;

const SCardItemWrapper = styled.View`
  padding: 10px 18px;
`;

const SChannelCopy = styled(SText)`
  margin-top: 10px;
  font-size: 14px;
  font-family: 'Poppins-SemiBold';
  color: ${({theme}) => theme.style.colors.primary};
`;
