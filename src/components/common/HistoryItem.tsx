import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {SArticleImageCopy} from '@components/card/SmallCardItem';
import {IArticle} from '~/types';
import {windowWidth, getCardStyle} from '~/utils';

interface IHistoryItemProps {
  article: IArticle;
  onMoveToScreen: () => void;
}

const {cardWidth, pageWidth} = getCardStyle(18, windowWidth / 3);

const HistoryItem = ({article, onMoveToScreen}: IHistoryItemProps) => {
  return (
    <SPage>
      <SInnerCard onPress={onMoveToScreen}>
        <SImageWrapper>
          {article.urlToImage ? (
            <Image
              source={{uri: article.urlToImage}}
              style={{
                width: cardWidth,
                height: 140,
                resizeMode: 'cover',
              }}
            />
          ) : (
            <SArticleImageCopy>Image not provided</SArticleImageCopy>
          )}
        </SImageWrapper>

        <STitle>{article.title}</STitle>
      </SInnerCard>
    </SPage>
  );
};

export default HistoryItem;

const SPage = styled.View`
  width: ${pageWidth}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SInnerCard = styled.TouchableOpacity`
  width: ${cardWidth}px;
  background-color: ${({theme}) => theme.style.colors.card};
  overflow: hidden;
  border-radius: 20px;
`;

const STitle = styled.Text.attrs({numberOfLines: 2})`
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.text};
  padding: 20px 10px;
`;

const SImageWrapper = styled.View`
  width: ${cardWidth}px;
  height: 140px;
  ${({theme}) => theme.variables.flex('row', 'center', 'center')}
`;
