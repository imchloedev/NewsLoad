import {useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from '~/styles/theme';

const useThemeColors = () => {
  const scheme = useColorScheme();
  const currentTheme = scheme === 'light' ? lightTheme : darkTheme;

  return currentTheme;
};
export default useThemeColors;
