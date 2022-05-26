import React, { useCallback, useMemo, useState } from 'react';
import { createStyles } from '../assets/styles';

interface ProvideValue {
  styles: any;
  theme: any;
  setTheme: (newTheme: any) => void;
}

export interface Props {
  initial: any;
  children?: React.ReactNode;
}

export const ThemeContext = React.createContext<ProvideValue>({
  styles: createStyles({}),
  theme: {},
  setTheme: (newTheme: any) => console.log('theme is not render')
});

export const ThemeProvider = React.memo<Props>((props) => {
  const [theme, setTheme] = useState(props.initial);

  const callback = useCallback((newTheme) => {
    setTheme({ ...newTheme })
  }, []);

  const value = useMemo(() => {
    return {
      styles: createStyles(theme),
      theme,
      setTheme: callback
    }
  }, [theme]);

  return <ThemeContext.Provider value={value}>
    {props.children}
  </ThemeContext.Provider>
});