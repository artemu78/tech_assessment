import React, { useState } from "react";
import { getCookie } from "tools";
import {
  Langs,
  IContestProps,
  ILangContext,
  IProps,
  IQuestionsContestProps,
  IQuestions,
} from "./types";

const prog_lang = getCookie("prog_lang") as Langs;

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

const LangContext = React.createContext<ILangContext>({
  language: prog_lang,
  change: () => {},
});

const LangProvider = ({ children }: IProps) => {
  const [language, setLang] = useState<Langs>(prog_lang);
  const change = (lang: Langs): void => setLang(lang);

  return <LangContext.Provider value={{ change, language }}>{children}</LangContext.Provider>;
};

const QuestionsContext = React.createContext<IQuestionsContestProps>({
  questions: {},
  change: (questions: IQuestions) => {},
});

const QuestionsProvider = ({ children }: IProps) => {
  const [questions, setQuestions] = useState<IQuestions>({});
  const change = (questions: IQuestions): void => setQuestions(questions);

  return (
    <QuestionsContext.Provider value={{ change, questions }}>{children}</QuestionsContext.Provider>
  );
};

export {
  ThemeProvider,
  ThemeContext,
  LangProvider,
  LangContext,
  QuestionsProvider,
  QuestionsContext,
};
