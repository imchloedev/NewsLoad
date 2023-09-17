import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {styled} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {IArticle} from '~/store/atom';
import {TOnMoveToScreen} from '@components/card/LargeCardSection';
import {getCardStyle, windowHeight} from '~/utils';

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
        onPress={() => onMoveToScreen(article.title, article.url)}>
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

// const styles = StyleSheet.create({
//   linearGradient: {
//     width: windowWidth - 18,
//     height: '100%',
//     position: 'absolute',
//     top: 0,
//     zIndex: 10,
//     borderRadius: 20,
//   },
// });

const SCard = styled.View<{pageWidth: number}>`
  width: ${({pageWidth}) => pageWidth}px;
  display: flex;
  align-items: center;
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
