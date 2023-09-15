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
import LargeCardItem from '@components/card/LageCardItem';
import {useNewsQuery} from '~/hooks';
import {IArticle} from '~/store/atom';
import {getCardStyle} from '~/utils';

const news = [
  {
    num: 1,
    color: '#86E3CE',
    title: 'DFffdf',
    urlToImage:
      'https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1696&q=80',
  },
  {
    num: 2,
    color: '#D0E6A5',
    title: 'DFffdf',
    urlToImage:
      'https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1696&q=80',
  },
  {
    num: 3,
    color: '#FFDD94',
    title: 'DFffdf',
    urlToImage:
      'https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1696&q=80',
  },
  {
    num: 4,
    color: '#FA897B',
    title: 'DFffdf',
    urlToImage:
      'https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1696&q=80',
  },
  {
    num: 5,
    color: '#CCABD8',
    title: 'DFffdf',
    urlToImage:
      'https://images.unsplash.com/photo-1554147090-e1221a04a025?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1696&q=80',
  },
];

export type TOnMoveToScreen = (title: string, url: string) => void;

interface ILargeCardSectionProps {
  onMoveToScreen: TOnMoveToScreen;
}

const windowWidth = Dimensions.get('window').width;

const LargeCardSection = ({onMoveToScreen}: ILargeCardSectionProps) => {
  // const {news} = useNewsQuery(0, 5);
  const [currentPage, setCurrentPage] = useState(0);
  const flatListRef = useRef<FlatList | null>(null);
  //   console.log('currentPage', currentPage);
  const {gap, pageWidth} = getCardStyle(windowWidth);

  const scrollToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
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

    if (news && currentIndex === news.length - 1) {
      scrollToPage(0);
    }
  };

  // 📌 pagination 확인하기 --> currentPage가 0 -> 1 -> 2가 아닌 0 -> 1 -> 0 -> 1 왔다갔다함..

  // useEffect(() => {
  //   if (!news) {
  //     return;
  //   }

  //   const autoScroll = setInterval(() => {
  //     const nextPage = (currentPage + 1) % news.length;
  //     scrollToPage(nextPage);
  //   }, 5000);

  //   return () => clearInterval(autoScroll);
  // }, [currentPage, news]);

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
  overflow: hidden;
  margin: 10px 0 0 0px;
`;

const SPaginationContainer = styled.View`
  ${({theme}) => theme.variables.flex('row', 'center', 'center')};
  gap: 8px;
  padding-top: 20px;
`;