import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {SmallCardItem} from '@components/card';
import {TOnMoveToScreen} from '@components/card/LargeCardSection';
import {useNewsQuery} from '@lib/hooks/queries';

interface ISmallCardSectionProps {
  onMoveToScreen: TOnMoveToScreen;
}

const SmallCardSection = ({onMoveToScreen}: ISmallCardSectionProps) => {
  const {news} = useNewsQuery(5, 20);

  return (
    <View>
      {news &&
        news.map((article, idx) => (
          <SCardItemWrapper key={idx}>
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
