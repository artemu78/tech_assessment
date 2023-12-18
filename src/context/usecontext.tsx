import React, { useState } from "react";
import { LangContext, LangProvider } from "./langs";
import { QuestionsContext, QuestionsProvider } from "./questions";
import { ResultsContext, ResultsProvider } from "./results";
import { StepContext, StepProvider } from "./steps";

import { IContestProps, IProps } from "./types";

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

const ThemeContext = React.createContext<IContestProps | null>(null);

const ThemeProvider = ({ children }: IProps) => {
  const [value, setTheme] = useState<string>("light");
  const change = (theme: string): void => setTheme(theme);
  return <ThemeContext.Provider value={{ change, value }}>{children}</ThemeContext.Provider>;
};

export {
  ThemeProvider,
  ThemeContext,
  LangProvider,
  LangContext,
  QuestionsProvider,
  QuestionsContext,
  ResultsProvider,
  ResultsContext,
  StepProvider,
  StepContext,
};
