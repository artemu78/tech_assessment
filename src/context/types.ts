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

export enum EParsePartition {
  question = "question",
  description = "description",
  answers = "answers",
  explanation = "explanation",
}

export enum EquizItemState {
  NEW,
  RIGHT,
  WRONG,
  SKIPPED,
}

export type IQuestions = Partial<Record<Langs, IQuizItem[]>>;

export interface IQuestionsContestProps {
  change: (questions: IQuestions) => void;
  questions: IQuestions;
}

export interface IQuizItem {
  question: string; // question header, i.e. question itself
  description: string; // between question and answers, some question details
  answers: IAnswer[];
  explanation: string; // block below answers, some tutoring link
}

export interface IAnswer {
  isCorrect: boolean;
  text: string;
  description: string;
}

export interface IQuizItemResult {
  result: EquizItemState;
  answer: number;
  duration?: number;
}
export interface IResultsByLang {
  [key: string]: IQuizItemResult[];
}

export interface IResults {
  [key: string]:
    | IQuizItemResult[]
    | ((lang: string, index: number, result: IQuizItemResult) => void)
    | ((lang: string) => void);
  change: (lang: string, index: number, result: IQuizItemResult) => void;
  init: (lang: string) => void;
}
