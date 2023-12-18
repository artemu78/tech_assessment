import React, { useState } from "react";
import { ILangContext, IProps } from "./types";
import { getCookie } from "tools";
import { IQuizCode } from "tools/const";

const prog_lang = getCookie("prog_lang") as IQuizCode;

export const LangContext = React.createContext<ILangContext>({
  language: prog_lang,
  change: () => {},
});

export const LangProvider = ({ children }: IProps) => {
  const [language, setLang] = useState<IQuizCode>(prog_lang);
  const change = (lang: IQuizCode): void => setLang(lang);

  return <LangContext.Provider value={{ change, language }}>{children}</LangContext.Provider>;
};
