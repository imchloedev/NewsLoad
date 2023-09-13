import React, {useEffect, useRef, useState} from 'react';
import {styled} from 'styled-components/native';
import {
  View,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import LargeCardItem from '~/components/card/LageCardItem';
import {useNewsQuery} from '~/hooks/useNewsQuery';
import {IArticle} from '~/store/atom';
import useThemeColors from '~/hooks/useThemeColors';
import {variables} from '../../styles/theme';

const windowWidth = Dimensions.get('window').width;

export type TOnMoveToScreen = (title: string, url: string) => void;

interface ILargeCardSectionProps {
  onMoveToScreen: TOnMoveToScreen;
}

const LargeCardSection = ({onMoveToScreen}: ILargeCardSectionProps) => {
  const {news} = useNewsQuery(0, 5);
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList | null>(null);

  const scrollToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    flatListRef.current?.scrollToIndex({animated: true, index: pageIndex});
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / windowWidth);
    setCurrentPage(currentIndex);
  };

  const onScrollEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(offsetX / windowWidth);

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
            initialScrollIndex={currentPage}
            onScrollEndDrag={onScrollEndDrag}
          />
          <SPaginationContainer>
            {news.map((_: IArticle, index: number) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  backgroundColor: currentPage === index ? '#FB6A00' : 'white',
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
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  margin: 10px 18px 0 18px;
`;

const SPaginationContainer = styled.View`
  ${({theme}) => theme.variables.flex('row', 'center', 'center')};
  gap: 8px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
`;
