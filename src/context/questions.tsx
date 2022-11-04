import React, { useState } from "react";
import { IProps, IQuestionsContestProps, IQuestions } from "./types";

export const QuestionsContext = React.createContext<IQuestionsContestProps>({
  questions: {},
  change: (questions: IQuestions) => {},
});

export const QuestionsProvider = ({ children }: IProps) => {
  const [questions, setQuestions] = useState<IQuestions>({});
  const change = (questions: IQuestions): void => setQuestions(questions);

  return (
    <QuestionsContext.Provider value={{ change, questions }}>{children}</QuestionsContext.Provider>
  );
};
