import ErrorBoundary from 'react-native-error-boundary';
import {isAxiosError} from 'axios';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {ChildrenProps} from '@lib/types';

const RetryErrorBoundary = ({children}: ChildrenProps) => {
  return (
    <ErrorBoundary
      onError={error => {
        if (
          isAxiosError(error) &&
          (error.response?.status === 429 || error.response?.status === 500)
        ) {
          throw error;
        }
      }}
      FallbackComponent={({resetError}) => (
        <SErrorContainer>
          <SText>Please try again.</SText>
          <SIconWrapper onPress={resetError}>
            <Icon name="refresh" size={20} color={'white'} />
          </SIconWrapper>
        </SErrorContainer>
      )}>
      {children}
    </ErrorBoundary>
  );
};

export default RetryErrorBoundary;

const SErrorContainer = styled.View`
  ${({theme}) => theme.variables.flex('column', 'center', 'center')};
  height: 200px;
  background-color: ${({theme}) => theme.style.colors.background};
`;

const SText = styled.Text`
  font-family: 'Poppins-Regular';
`;

const SIconWrapper = styled.TouchableOpacity`
  margin-top: 20px;
  width: 60px;
  height: 40px;
  background-color: ${({theme}) => theme.style.colors.primary};
  border-radius: 20px;
  ${({theme}) => theme.variables.flex('column', 'center', 'center')};
`;
