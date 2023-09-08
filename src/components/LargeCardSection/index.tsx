import React, {useEffect, useRef, useState} from 'react';
import {styled} from 'styled-components/native';
import {
  View,
  FlatList,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  Animated,
} from 'react-native';
import LargeCardItem from '@components/LargeCardItem';
import {useNewsQuery} from '~/hooks/useNewsQuery';
import {IArticle} from '~/store/atom';

// interface ILargeCardSectionProps {

// }

// 📌 캐러셀 autoplay 구현하기

const windowWidth = Dimensions.get('window').width;

const LargeCardSection = () => {
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
    }, 3000);

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
            renderItem={({item}) => <LargeCardItem article={item} />}
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
                  width: 16,
                  height: 2,
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
  border-radius: 0 0 40px 40px;
  overflow: hidden;
`;

const SPaginationContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* gap: 10px; */
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
`;
