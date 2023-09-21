import 'styled-components/native';
import {CSS} from 'styled-components/dist/types';

declare module 'styled-components/native' {
  export interface ITheme {
    lightTheme: {
      colors: {
        background: string;
        card: string;
        text: string;
        primary: string;
        gray: string;
        middleGray: string;
        darkGray: string;
        white: string;
        black: string;
        inactive: string;
      };
    };
    darkTheme: {
      colors: {
        background: string;
        card: string;
        text: string;
        primary: string;
        gray: string;
        middleGray: string;
        darkGray: string;
        white: string;
        black: string;
        inactive: string;
      };
    };
    variables: {
      flex: CSS;
    };
  }
}
