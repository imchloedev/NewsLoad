import React from 'react';
import {Image} from 'react-native';
import {styled} from 'styled-components/native';
import {TOnMoveToScreen} from '@components/card/LargeCardSection';
import {getCardStyle, windowHeight} from '~/utils';
import {IArticle} from '~/types';

interface ILargeCardItemProps {
  article: IArticle;
  onMoveToScreen: TOnMoveToScreen;
}

const LargeCardItem = ({article, onMoveToScreen}: ILargeCardItemProps) => {
  const {cardWidth, pageWidth} = getCardStyle();

  return (
    <SCard pageWidth={pageWidth}>
      <SCardWrapper
        cardWidth={cardWidth}
        onPress={() => onMoveToScreen(article)}>
        <Image
          source={{uri: article.urlToImage}}
          style={{
            width: cardWidth,
            height: windowHeight / 3,
            resizeMode: 'cover',
          }}
        />
        <SArticleTitleContainer>
          <SArticleTitle>{article.title}</SArticleTitle>
        </SArticleTitleContainer>
      </SCardWrapper>
    </SCard>
  );
};

export default LargeCardItem;

const SCard = styled.View<{pageWidth: number}>`
  width: ${({pageWidth}) => pageWidth}px;
  ${({theme}) => theme.variables.flex('column', 'flex-start', 'center')}
`;

const SCardWrapper = styled.TouchableOpacity<{cardWidth: number}>`
  width: ${({cardWidth}) => cardWidth}px;
  overflow: hidden;
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 20px;
`;

const SArticleTitleContainer = styled.View`
  padding: 30px 18px;
`;

const SArticleTitle = styled.Text.attrs({numberOfLines: 2})`
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.text};
  font-size: 16px;
`;
