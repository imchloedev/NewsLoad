import React, {useRef} from 'react';
import {Animated, Image} from 'react-native';
import styled from 'styled-components/native';
import {ViewScreenProps} from './@types';
import {dateToString, windowHeight, windowWidth} from '~/utils';

const ViewScreen = ({route}: ViewScreenProps) => {
  const {title, author, publishedAt, urlToImage, description, url} =
    route.params.article;
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );

  return (
    <SContainer onScroll={handleScroll} scrollEventThrottle={16}>
      <Animated.View
        style={{
          height: scrollY.interpolate({
            inputRange: [0, windowHeight / 2],
            outputRange: [windowHeight / 2, 0],
            extrapolate: 'clamp',
          }),
        }}>
        <Image
          source={{uri: urlToImage}}
          style={{
            width: windowWidth,
            height: windowHeight / 2,
            resizeMode: 'cover',
          }}
        />
      </Animated.View>
      <SInfoWrapper>
        <SInfoHeader>
          <STitle>{title}</STitle>
          <SAuthor>Written by {author}</SAuthor>
          <SDate>Published at {dateToString(publishedAt)}</SDate>
        </SInfoHeader>

        <SContent>{description}</SContent>
        <SContent>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </SContent>
        {/* webview로 연결 */}

        <SUrlBtn>
          <SText>{url}</SText>
        </SUrlBtn>
      </SInfoWrapper>
    </SContainer>
  );
};

export default ViewScreen;

const SContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.style.colors.card};
`;

const SInfoWrapper = styled.View`
  background-color: ${({theme}) => theme.style.colors.card};
  border-radius: 40px 40px 0 0;
  padding: 40px 18px 100px 18px;
  margin-top: -40px;
`;

const SInfoHeader = styled.View`
  padding-bottom: 40px;
`;

const SText = styled.Text`
  font-family: 'Poppins-Regular';
  color: ${({theme}) => theme.style.colors.text};
`;

const STitle = styled(SText)`
  font-size: 24px;
  font-weight: 700;
  padding-bottom: 20px;
`;

const SAuthor = styled(SText)`
  font-size: 14px;
  font-weight: 400;
  color: ${({theme}) => theme.style.colors.gray};
`;

const SDate = styled(SText)`
  font-size: 14px;
  font-weight: 400;
  color: ${({theme}) => theme.style.colors.gray};
`;

const SContent = styled(SText)`
  padding: 14px 0;
  font-size: 16px;
  line-height: 24px;
`;

const SUrlBtn = styled.TouchableOpacity``;
