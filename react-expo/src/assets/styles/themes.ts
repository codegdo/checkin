export type ThemeColor = {
  barStyle: 'default' | 'light-content' | 'dark-content';

  background: string;
  onBackground: string;

  white: string;
  black: string;
  gray: string;

  light: string;
  dark: string;

  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;
  red: string;
  onRed: string;
  yellow: string;
  onYellow: string;
  blue: string;
  onBlue: string;
  orange: string;
  onOrange: string;
  purple: string;
  onPurple: string;
  green: string;
  onGreen: string;
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
  onBackground: '#dddddd',
  //
  white: '#ffffff',
  black: '#000000',
  gray: '#dddddd',
  //
  light: '',
  dark: '',
  // brand
  primary: '',
  onPrimary: '',
  secondary: '',
  onSecondary: '',
  // primary
  red: '',
  onRed: '',
  yellow: '',
  onYellow: '',
  blue: '',
  onBlue: '',
  // secondary
  orange: '',
  onOrange: '',
  purple: '',
  onPurple: '',
  green: '',
  onGreen: ''
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
    onBackground: '#dddddd'
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
    onBackground: '#cccccc'
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
