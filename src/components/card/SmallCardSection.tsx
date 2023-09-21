import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {useNewsQuery} from '~/hooks/useNewsQuery';
import {SmallCardItem} from '@components/card';
import {TOnMoveToScreen} from '@components/card/LargeCardSection';

interface ISmallCardSectionProps {
  onMoveToScreen: TOnMoveToScreen;
}

const SmallCardSection = ({onMoveToScreen}: ISmallCardSectionProps) => {
  const {news} = useNewsQuery(5, 20);

  return (
    <View>
      {news &&
        news.map((article, idx) => (
          <SCardItemWrapper>
            <SmallCardItem
              key={`${article.title}+${idx}`}
              article={article}
              onMoveToScreen={onMoveToScreen}
            />
          </SCardItemWrapper>
        ))}
    </View>
  );
};

export default SmallCardSection;

const SCardItemWrapper = styled.View`
  margin-bottom: 20px;
`;
