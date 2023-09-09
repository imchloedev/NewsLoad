import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {MainStackParamList} from '../@types';
import LargeCardSection from '@components/LargeCardSection';
import Layout from '@components/Layout';
import SubTitle from '~/components/SubTitle';
import {styled} from 'styled-components/native';
import {useNewsQuery} from '~/hooks/useNewsQuery';
import SmallCardSection from '~/components/SmallCardSection';

type HomeScreenProps = NativeStackScreenProps<MainStackParamList, 'Home'>;

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [user, setUser] = useState(true);

  const {news} = useNewsQuery(5);
  console.log(news);

  return (
    <Layout>
      <ScrollView>
        <LargeCardSection />

        <SContentWrapper>
          <SubTitle title="Top Headlines" />
          <SmallCardSection />
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
