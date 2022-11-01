import React, { useState } from "react";
import { getCookie } from "tools";

const prog_lang = getCookie("prog_lang");

interface Props {
  children: JSX.Element;
}

export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

interface ContestProps {
  change: (theme: string) => void;
  value: string;
}

const ThemeContext = React.createContext<ContestProps | null>(null);

const ThemeProvider = ({ children }: Props) => {
  const [value, setTheme] = useState<string>("light");
  const change = (theme: string): void => setTheme(theme);
  return (
    <ThemeContext.Provider value={{ change, value }}>
      {children}
    </ThemeContext.Provider>
  );
};

const LangContext = React.createContext<ContestProps>({value: prog_lang, change: () => {}});

const LangProvider = ({ children }: Props) => {
  const [value, setLang] = useState<string>(prog_lang);
  const change = (lang: string): void => setLang(lang);

  return (
    <LangContext.Provider value={{ change, value }}>
      {children}
    </LangContext.Provider>
  );
}

export { ThemeProvider, ThemeContext, LangProvider, LangContext };