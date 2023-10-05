import {Dimensions} from 'react-native';

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const getCardStyle = (cardGap: number, cardOffset: number) => {
  const gap = cardGap; // 카드 사이 간격
  const offset = cardOffset; //다음 카드가 보여질 공간
  const cardWidth = windowWidth - offset - gap * 2; // 카드의 너비
  const pageWidth = cardWidth + gap; // 한 페이지의 너비

  return {gap, offset, cardWidth, pageWidth};
};
