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

export enum EMode {
  question = "question",
  description = "description",
  answers = "answers",
  explanation = "explanation",
}

export type IQuestions = Partial<Record<Langs, IQuestion[]>>;

export interface IQuestionsContestProps {
  change: (questions: IQuestions) => void;
  questions: IQuestions;
}

export interface IQuestion {
  question: string;
  description: string[];
  answers: string[];
  explanation: string[];
}
