import React, {useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import {getNews, useNewsQuery} from '~/hooks/useNewsQuery';
import SmallCardItem from './SmallCardItem';
import {TOnMoveToScreen} from '~/components/card/LargeCardSection';
import {useInfiniteQuery} from 'react-query';
import {useNewsInfiniteQuery} from '~/hooks/useNewsInfiniteQuery';

interface ISmallCardSectionProps {
  onMoveToScreen: TOnMoveToScreen;
}

const SmallCardSection = ({onMoveToScreen}: ISmallCardSectionProps) => {
  const {news} = useNewsQuery(5, 20);

  return (
    <View>
      {news &&
        news.map((article, idx) => (
          <SmallCardItem
            key={`${article.title}+${idx}`}
            article={article}
            onMoveToScreen={onMoveToScreen}
          />
        ))}
    </View>
  );
};

export default SmallCardSection;
