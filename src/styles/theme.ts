import {ITheme} from 'styled-components/native';
import {DarkTheme, DefaultTheme} from '@react-navigation/native';

// default - light mode
// {"colors": {"background": "rgb(242, 242, 242)", "border": "rgb(216, 216, 216)", "card": "rgb(255, 255, 255)", "notification": "rgb(255, 59, 48)", "primary": "rgb(0, 122, 255)", "text": "rgb(28, 28, 30)"}, "dark": false}

const common = {
  colors: {
    primary: '#1cd760',
    gray: '#bebebe',
    middleGray: '#808080',
    darkGray: '#333',
    white: '#fff',
    black: '#000',
  },
};

const flex = (direction = 'row', justify = 'center', align = 'center') => `
display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${align};
`;

const theme: ITheme = {
  lightTheme: {
    colors: {
      ...common.colors,
      background: DefaultTheme.colors.background,
      card: DefaultTheme.colors.card,
      text: DefaultTheme.colors.text,
      inactive: '#ececec',
    },
  },
  darkTheme: {
    colors: {
      ...common.colors,
      background: DarkTheme.colors.background,
      card: DarkTheme.colors.card,
      text: DarkTheme.colors.text,
      inactive: '#333',
    },
  },
  variables: {
    flex: flex,
  },
};

const {lightTheme, darkTheme, variables} = theme;
export {lightTheme, darkTheme, variables};
