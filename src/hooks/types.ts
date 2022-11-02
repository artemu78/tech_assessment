export enum Langs {
  REACT = "react",
  CSS = "css",
  HTML = "html",
  JAVASCRIPT = "javascript",
  FRONTEND = "frontend",
}

export interface IContestProps {
  change: (theme: string) => void;
  value: string;
}

export interface ILangContext {
  language: Langs;
  change: (lang: Langs) => void;
}

export interface IProps {
  children: JSX.Element;
}

export interface IQuestionsContestProps {
  change: (theme: string) => void;
  questions: { [key: string]: string };
}
