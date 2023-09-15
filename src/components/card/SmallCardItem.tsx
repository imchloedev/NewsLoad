import React from 'react';
import {View, Text, Image} from 'react-native';
import {styled} from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {IArticle} from '~/store/atom';
import {dateToString} from '~/utils/dateToString';
import {TOnMoveToScreen} from '@components/card/LargeCardSection';
import {SCustomText} from '@components/common';

interface SSmallCardItemProps {
  article: IArticle;
  onMoveToScreen: TOnMoveToScreen;
}

const SmallCardItem = ({article, onMoveToScreen}: SSmallCardItemProps) => {
  return (
    <SSmallCardWrapper
      onPress={() => onMoveToScreen(article.title, article.url)}>
      <SImageWrapper>
        {article.urlToImage ? (
          <Image
            source={{uri: article.urlToImage}}
            style={{width: 100, height: 100, resizeMode: 'cover'}}
          />
        ) : (
          <SImageCopy>Image not provided</SImageCopy>
        )}
      </SImageWrapper>

      <SArticleInfo>
        <SArticleTitle>{article.title}</SArticleTitle>
        <View>
          <SIconTextWrapper>
            <Icon name="pencil-sharp" size={14} color={'gray'} />
            <SAuthorCopy>{article.author}</SAuthorCopy>
          </SIconTextWrapper>

          <SIconTextWrapper>
            <Icon name="time-outline" size={14} color={'gray'} />
            <SDateCopy>{dateToString(article.publishedAt)}</SDateCopy>
          </SIconTextWrapper>
        </View>
      </SArticleInfo>
    </SSmallCardWrapper>
  );
};

export default SmallCardItem;

const SSmallCardWrapper = styled.TouchableOpacity`
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'flex-start')}
  gap: 16px;
  padding: 10px 10px;
  margin: 10px 0;
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 20px;
`;

const SImageWrapper = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;

const SArticleInfo = styled.View`
  flex-shrink: 1;
  flex-grow: 1;

  ${({theme}) => theme.variables.flex('column', 'center', 'flex-start')}
`;

const SArticleTitle = styled(SCustomText).attrs({numberOfLines: 2})`
  font-size: 16px;
  margin-bottom: 10px;
`;

const SIconTextWrapper = styled.View`
  ${({theme}) => theme.variables.flex('row', 'flex-start', 'center')}
  gap: 6px;
`;

const SDateCopy = styled(SCustomText)`
  color: gray;
  font-size: 12px;
`;

const SAuthorCopy = styled(SCustomText).attrs({numberOfLines: 1})`
  color: gray;
  font-size: 12px;
  margin-bottom: 5px;
  flex-grow: 1;
  flex-shrink: 1;
`;

const SImageCopy = styled(SCustomText)`
  color: gray;
  font-size: 12px;
  text-align: center;
`;
