import ErrorBoundary from 'react-native-error-boundary';
import styled from 'styled-components/native';
import {ChildrenProps} from '~/types';

const CriticalErrorBoundary = ({children}: ChildrenProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={() => (
        <SErrorContainer>
          <SErrorTitle>Failed to retrieve data from the server.</SErrorTitle>
          <SErrorCopy>
            If the error persists, please exit the app and try again in a few
            minutes.
          </SErrorCopy>
        </SErrorContainer>
      )}>
      {children}
    </ErrorBoundary>
  );
};

export default CriticalErrorBoundary;

const SErrorContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.style.colors.background};
`;

const SErrorTitle = styled.Text`
  font-family: 'Poppins-Bold';
  font-size: 24px;
  padding: 10px 18px;
`;

const SErrorCopy = styled(SErrorTitle)`
  font-family: 'Poppins-Bold';
  font-size: 16px;
`;
