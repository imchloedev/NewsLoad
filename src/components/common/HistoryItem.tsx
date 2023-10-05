import React from 'react';
import {Image} from 'react-native';
import styled from 'styled-components/native';
import {IArticle} from '~/types';
import {windowWidth, getCardStyle} from '~/utils';

interface IHistoryItemProps {
  article: IArticle;
  onMoveToScreen: () => void;
}

const HistoryItem = ({article, onMoveToScreen}: IHistoryItemProps) => {
  const {cardWidth, pageWidth} = getCardStyle(18, windowWidth / 3);

  return (
    <SPage pageWidth={pageWidth}>
      <SInnerCard cardWidth={cardWidth} onPress={onMoveToScreen}>
        <Image
          source={{uri: article.urlToImage}}
          style={{
            width: cardWidth,
            height: 140,
            resizeMode: 'cover',
          }}
        />
        <STitle>{article.title}</STitle>
      </SInnerCard>
    </SPage>
  );
};

export default HistoryItem;

const SPage = styled.View<{pageWidth: number}>`
  width: ${({pageWidth}) => pageWidth}px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SInnerCard = styled.TouchableOpacity<{cardWidth: number}>`
  width: ${({cardWidth}) => cardWidth}px;
  background-color: ${({theme}) => theme.style.colors.card};
  overflow: hidden;
  border-radius: 20px;
`;

const STitle = styled.Text.attrs({numberOfLines: 2})`
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.text};
  padding: 20px 10px;
`;
