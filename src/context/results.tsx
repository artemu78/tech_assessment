import { useState, createContext } from "react";
import { IQuizItemResult, IProps, IResultsByLang, IResults } from "./types";

export const ResultsContext = createContext<IResults>({
  change: (lang: string, index: number, result: IQuizItemResult) => {},
  init: (lang: string) => {},
});

export const ResultsProvider = ({ children }: IProps) => {
  const [results, setResults] = useState<IResultsByLang>({});
  const change = (lang: string, index: number, result: IQuizItemResult): void => {
    results[lang][index] = result;
    setResults({ ...results });
  };
  const init = (lang: string) => {
    if (!results[lang]) {
      results[lang] = [];
      setResults({ ...results });
    }
  };

  return (
    <ResultsContext.Provider value={{ ...results, change, init }}>
      {children}
    </ResultsContext.Provider>
  );
};
