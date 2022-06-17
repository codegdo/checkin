export type ThemeColor = {
  barStyle: 'default' | 'light-content' | 'dark-content';

  background: string;
  overBackground: string;

  button: string;
  overButton: string;

  white: string;
  black: string;
  gray: string;

  light: string;
  dark: string;

  primary: string;
  overPrimary: string;
  secondary: string;
  overSecondary: string;
  red: string;
  overRed: string;
  yellow: string;
  overYellow: string;
  blue: string;
  overBlue: string;
  orange: string;
  overOrange: string;
  purple: string;
  overPurple: string;
  green: string;
  overGreen: string;
};
export type ThemeSize = {
  h1: number;
  h2: number;
  h3: number;
  text: number;
  small: number;
};
export type ThemeSpacing = {
  small: number;
  medium: number;
  large: number;
};
export type ThemeRounding = {
  small: number;
  medium: number;
  large: number;
};

export type ThemeData = {
  COLOR: ThemeColor;
  SIZE: ThemeSize;
  SPACING: ThemeSpacing;
  ROUNDING: ThemeRounding;
};

export type Theme = {
  id: number;
  name: string;
  title: string;
  data: string;
};

const color: ThemeColor = {
  // status bar
  barStyle: 'default',
  // background
  background: '#efefef',
  overBackground: '#dddddd',
  // button
  button: '#444444',
  overButton: '#ffffff',
  //
  white: '#ffffff',
  black: '#000000',
  gray: '#dddddd',
  //
  light: '',
  dark: '',
  // brand
  primary: '',
  overPrimary: '',
  secondary: '',
  overSecondary: '',
  // primary
  red: '',
  overRed: '',
  yellow: '',
  overYellow: '',
  blue: '',
  overBlue: '',
  // secondary
  orange: '',
  overOrange: '',
  purple: '',
  overPurple: '',
  green: '',
  overGreen: ''
};
const size: ThemeSize = {
  h1: 76,
  h2: 47,
  h3: 29,
  text: 18,
  small: 11
};
const spacing: ThemeSpacing = {
  small: 8,
  medium: 16,
  large: 32
};
const rounding: ThemeRounding = {
  small: 8,
  medium: 16,
  large: 32
};

export const lightTheme: ThemeData = {
  COLOR: {
    ...color,
    barStyle: 'dark-content',
    background: '#efefef',
    overBackground: '#dddddd'
  },
  SIZE: { ...size },
  SPACING: { ...spacing },
  ROUNDING: { ...rounding },
};

export const darkTheme: ThemeData = {
  COLOR: {
    ...color,
    barStyle: 'light-content',
    background: '#444444',
    overBackground: '#cccccc',
    button: '#000000',
    overButton: '#ffffff',
  },
  SIZE: { ...size },
  SPACING: { ...spacing },
  ROUNDING: { ...rounding }
};

export const themes: Theme[] = [
  {
    id: 1,
    name: 'LIGHT',
    title: 'Light Theme',
    data: '{}',
  },
];
