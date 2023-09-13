import {ITheme} from 'styled-components/native';

const common = {
  colors: {
    primary: '#FB5839',
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
      ...common.colors,
    },
  },
  darkTheme: {
    colors: {
      background: '#222',
      card: '#222',
      text: '#fff',
      ...common.colors,
    },
  },
  variables: {
    flex: flex,
  },
};

const {lightTheme, darkTheme, variables} = theme;
export {lightTheme, darkTheme, variables};
