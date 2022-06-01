import React, { useCallback, useMemo, useState } from 'react';
import { createStyles } from '../assets/styles';
import { lightTheme, ThemeData } from '../assets/styles/themes';

export type StylesType = ReturnType<typeof createStyles>;

type ThemeContextProps = {
  styles: StylesType;
  theme: ThemeData;
  setTheme: (newTheme: ThemeData) => void;
}

export type ThemeProps = {
  initial: ThemeData;
  children?: React.ReactNode;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  styles: createStyles(lightTheme),
  theme: lightTheme,
  setTheme: (newTheme: ThemeData) => console.log('no theme')
});

export const ThemeProvider = React.memo<ThemeProps>(({ initial, children }) => {
  const [theme, setTheme] = useState<ThemeData>(initial);

  const setThemeCallback = useCallback((newTheme: ThemeData) => {
    setTheme({ ...newTheme })
  }, []);

  const value = useMemo(() => {
    return {
      styles: createStyles(theme),
      theme,
      setTheme: setThemeCallback
    }
  }, [theme]);

  return <ThemeContext.Provider value={value}>
    {children}
  </ThemeContext.Provider>
});