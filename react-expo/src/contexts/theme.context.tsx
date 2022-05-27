import React, { useCallback, useMemo, useState } from 'react';
import { createStyles } from '../assets/styles';
import { lightTheme, ThemeData } from '../assets/styles/themes';

interface ProvideValue {
  styles: ReturnType<typeof createStyles>;
  theme: ThemeData;
  setTheme: (newTheme: ThemeData) => void;
}

export interface Props {
  initial: ThemeData;
  children?: React.ReactNode;
}

export const ThemeContext = React.createContext<ProvideValue>({
  styles: createStyles(lightTheme),
  theme: lightTheme,
  setTheme: (newTheme: ThemeData) => console.log('no theme')
});

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = useState<ThemeData>(props.initial);

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
    {props.children}
  </ThemeContext.Provider>
});