import React from 'react';
import {
  Image,
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
} from 'react-native';
import {styled} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {IArticle} from '~/store/atom';
import {TOnMoveToScreen} from '~/components/card/LargeCardSection';

interface ILargeCardItemProps {
  article: IArticle;
  onMoveToScreen: TOnMoveToScreen;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LargeCardItem = ({article, onMoveToScreen}: ILargeCardItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onMoveToScreen(article.title, article.url)}>
      <LinearGradient
        style={styles.linearGradient}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
      />
      <Image
        source={{uri: article.urlToImage}}
        style={{
          width: windowWidth - 36,
          height: windowHeight / 2,
          resizeMode: 'cover',
        }}
      />
      <SArticleTitleContainer>
        <SArticleTitle>{article.title}</SArticleTitle>
      </SArticleTitleContainer>
    </TouchableOpacity>
  );
};

export default LargeCardItem;

const styles = StyleSheet.create({
  linearGradient: {
    width: windowWidth - 36,
    height: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
});

const SArticleTitleContainer = styled.View`
  position: absolute;
  left: 20px;
  right: 20px;
  bottom: 60px;
  z-index: 10;
`;

const SArticleTitle = styled.Text`
  color: ${({theme}) => theme.style.colors.white};
  font-weight: bold;
  font-size: 20px;
`;
