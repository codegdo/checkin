import { StatusBarStyle } from 'react-native';

export type ThemeBackground = {};
export type ThemeColor = {
  barStyle: 'default' | 'light-content' | 'dark-content';
  barBackground: string;

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
  input: number;
  small: number;
};
export type ThemeSpacing = {
  input: number;
  small: number;
  medium: number;
  large: number;
};
export type ThemeRounding = {
  input: number;
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

export const lightTheme: ThemeData = {
  COLOR: {
    //status bar
    barStyle: 'dark-content',
    barBackground: '#efefef',

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
    onGreen: '',
  },
  SIZE: {
    h1: 76,
    h2: 47,
    h3: 29,
    text: 18,
    input: 18,
    small: 11,
  },
  SPACING: {
    input: 8,
    small: 8,
    medium: 16,
    large: 32,
  },
  ROUNDING: {
    input: 8,
    small: 8,
    medium: 16,
    large: 32,
  },
};

export const darkTheme: ThemeData = {
  COLOR: {
    //status bar
    barStyle: 'light-content',
    barBackground: '#444444',
    background: '#444444',
    onBackground: '#cccccc',
    //
    white: '#000000',
    black: '#ffffff',
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
    onGreen: '',
  },
  SIZE: {
    h1: 76,
    h2: 47,
    h3: 29,
    text: 18,
    input: 18,
    small: 11,
  },
  SPACING: {
    input: 8,
    small: 8,
    medium: 16,
    large: 32,
  },
  ROUNDING: {
    input: 8,
    small: 8,
    medium: 16,
    large: 32,
  },
};

export const themes: Theme[] = [
  {
    id: 1,
    name: 'LIGHT',
    title: 'Light Theme',
    data: '{}',
  },
];
