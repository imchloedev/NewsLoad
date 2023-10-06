import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {TOnMoveToScreen} from '@components/card/LargeCardSection';
import {getCardStyle, windowHeight} from '~/utils';
import {IArticle} from '~/types';
import {SArticleImageCopy} from './SmallCardItem';

interface ILargeCardItemProps {
  article: IArticle;
  onMoveToScreen: TOnMoveToScreen;
}

const {cardWidth, pageWidth} = getCardStyle(18, 36);

const LargeCardItem = ({article, onMoveToScreen}: ILargeCardItemProps) => {
  return (
    <SCard>
      <SCardWrapper onPress={() => onMoveToScreen(article)}>
        <SImageWrapper>
          {article.urlToImage ? (
            <Image
              source={{uri: article.urlToImage}}
              style={{
                width: cardWidth,
                height: windowHeight / 3,
                resizeMode: 'cover',
              }}
            />
          ) : (
            <SArticleImageCopy>Image not provided</SArticleImageCopy>
          )}
        </SImageWrapper>
        <SArticleTitleContainer>
          <SArticleTitle>{article.title}</SArticleTitle>
        </SArticleTitleContainer>
      </SCardWrapper>
    </SCard>
  );
};

export default LargeCardItem;

const SCard = styled.View`
  width: ${pageWidth}px;
  ${({theme}) => theme.variables.flex('column', 'flex-start', 'center')}
`;

const SCardWrapper = styled.TouchableOpacity`
  width: ${cardWidth}px;
  overflow: hidden;
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 20px;
`;

const SImageWrapper = styled.View`
  width: ${cardWidth}px;
  height: ${windowHeight / 3}px;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;

const SArticleTitleContainer = styled.View`
  padding: 30px 18px;
`;

const SArticleTitle = styled.Text.attrs({numberOfLines: 2})`
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.text};
  font-size: 16px;
`;
