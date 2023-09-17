import {ITheme} from 'styled-components/native';

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
      background: '#eee',
      card: '#fff',
      text: '#000',
      inactive: '#ececec',
      ...common.colors,
    },
  },
  darkTheme: {
    colors: {
      background: '#000',
      card: '#111',
      text: '#fff',
      inactive: '#333',
      ...common.colors,
    },
  },
  variables: {
    flex: flex,
  },
};

const {lightTheme, darkTheme, variables} = theme;
export {lightTheme, darkTheme, variables};
