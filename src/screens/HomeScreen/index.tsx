import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {styled} from 'styled-components/native';
import {MainStackParamList} from '../@types';
import LargeCardSection from '@components/card/LargeCardSection';
import Layout from '@components/common/Layout';
import Title from '@components/common/Title';
import SmallCardSection from '@components/card/SmallCardSection';
import {useNewsQuery} from '~/hooks/useNewsQuery';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [user, setUser] = useState(true);
  const {news} = useNewsQuery(5);

  const onMoveToScreen = (title: string, url: string) => {
    navigation.navigate('View', {title: title, url: url});
  };

  return (
    <Layout>
      <ScrollView>
        <LargeCardSection onMoveToScreen={onMoveToScreen} />
        <SContentWrapper>
          <STitleWrapper>
            <Title titleRole="sub" title="Top Headlines" />
          </STitleWrapper>
          <SmallCardSection onMoveToScreen={onMoveToScreen} />
        </SContentWrapper>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;

{
  /* <Button
        title="프로필로 이동하기"
        onPress={() =>
          user
            ? navigation.navigate('Profile')
            : navigation.navigate('Auth', {screen: 'SignIn'})
        }
      /> */
}
{
  /* <Text>Home</Text> */
}

const SContentWrapper = styled.View`
  padding: 40px 18px;
`;

const STitleWrapper = styled.View`
  padding-top: 40px;
  padding-bottom: 20px;
`;
