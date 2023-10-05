import React, {useEffect, useRef, useState} from 'react';
import styled from 'styled-components/native';
import {
  View,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import LargeCardItem from '~/components/card/LargeCardItem';
import {useNewsQuery} from '~/hooks';
import {getCardStyle} from '~/utils';
import {IArticle} from '~/types';
import useThemeColors from '~/hooks/useThemeColors';

export type TOnMoveToScreen = (article: IArticle) => void;

interface ILargeCardSectionProps {
  onMoveToScreen: TOnMoveToScreen;
}

const LargeCardSection = ({onMoveToScreen}: ILargeCardSectionProps) => {
  const {news} = useNewsQuery(0, 5);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const flatListRef = useRef<FlatList | null>(null);
  const {gap, pageWidth} = getCardStyle(18, 36);
  const theme = useThemeColors();

  const scrollToPage = (pageIndex: number) => {
    flatListRef.current?.scrollToIndex({animated: true, index: pageIndex});
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / pageWidth);
    setCurrentPage(currentIndex);
  };

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / pageWidth);
    setCurrentPage(currentIndex);

    if (news && currentIndex === news.length - 1) {
      scrollToPage(0);
    }
  };

  useEffect(() => {
    if (!news) {
      return;
    }

    const autoScroll = setInterval(() => {
      const nextPage = (currentPage + 1) % news.length;
      scrollToPage(nextPage);
    }, 5000);

    return () => clearInterval(autoScroll);
  }, [currentPage, news]);

  return (
    <SCardContainer>
      {news && (
        <View>
          <FlatList
            ref={flatListRef}
            data={news}
            pagingEnabled
            renderItem={({item}) => (
              <LargeCardItem article={item} onMoveToScreen={onMoveToScreen} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            onScrollEndDrag={onScrollEndDrag}
            initialScrollIndex={currentPage}
            contentContainerStyle={{
              paddingRight: gap,
              marginLeft: gap / 2,
            }}
            snapToInterval={pageWidth}
            decelerationRate="fast"
            snapToAlignment="start"
          />
          <SPaginationContainer>
            {news.map((_: any, index: number) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  backgroundColor:
                    currentPage === index ? theme.colors.primary : 'white',
                }}
              />
            ))}
          </SPaginationContainer>
        </View>
      )}
    </SCardContainer>
  );
};

export default LargeCardSection;

const SCardContainer = styled.View`
  overflow: hidden;
`;

const SPaginationContainer = styled.View`
  ${({theme}) => theme.variables.flex('row', 'center', 'center')};
  gap: 8px;
  padding-top: 20px;
`;
