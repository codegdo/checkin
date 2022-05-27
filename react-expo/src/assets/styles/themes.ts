import { StatusBarStyle } from "react-native";

export type ThemeColor = {
  barStyle: StatusBarStyle | null | undefined;
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
}
export type ThemeFontSize = {
  h1: number;
  h2: number;
  h3: number;
  p: number;
  small: number;
}
export type ThemeSpacing = {
  small: number;
  medium: number;
  large: number;
}
export type ThemeData = {
  COLOR: ThemeColor;
  FONT_SIZE: ThemeFontSize;
  SPACING: ThemeSpacing;
}
export type Theme = {
  id: number;
  name: string;
  title: string;
  data: string;
}
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
    onGreen: ''
  },
  FONT_SIZE: {
    h1: 76,
    h2: 47,
    h3: 29,
    p: 18,
    small: 11
  },
  SPACING: {
    small: 8,
    medium: 16,
    large: 32
  }
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
    onGreen: ''
  },
  FONT_SIZE: {
    h1: 76,
    h2: 47,
    h3: 29,
    p: 18,
    small: 11
  },
  SPACING: {
    small: 8,
    medium: 16,
    large: 32
  }
};

export const themes: Theme[] = [
  {
    id: 1,
    name: 'LIGHT',
    title: 'Light Theme',
    data: "{}"
  }
]
