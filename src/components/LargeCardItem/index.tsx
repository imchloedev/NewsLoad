import React from 'react';
import {Image, StyleSheet, Dimensions, View} from 'react-native';
import {styled} from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {IArticle} from '~/store/atom';

interface ILargeCardItemProps {
  article: IArticle;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LargeCardItem = ({article}: ILargeCardItemProps) => {
  return (
    <View>
      <LinearGradient
        style={styles.linearGradient}
        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']}
      />
      <Image
        source={{uri: article.urlToImage}}
        style={{
          width: windowWidth,
          height: windowHeight / 2,
          resizeMode: 'cover',
        }}
      />

      <SArticleTitleContainer>
        <SArticleTitle>{article.title}</SArticleTitle>
      </SArticleTitleContainer>
    </View>
  );
};

export default LargeCardItem;

const styles = StyleSheet.create({
  linearGradient: {
    width: windowWidth,
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
  color: white;
  /* line-height: 20px; */
  font-weight: bold;
  font-size: 20px;
`;
