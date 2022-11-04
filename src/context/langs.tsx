import React, { useState } from "react";
import { Langs, ILangContext, IProps } from "./types";
import { getCookie } from "tools";

const prog_lang = getCookie("prog_lang") as Langs;

export const LangContext = React.createContext<ILangContext>({
  language: prog_lang,
  change: () => {},
});

export const LangProvider = ({ children }: IProps) => {
  const [language, setLang] = useState<Langs>(prog_lang);
  const change = (lang: Langs): void => setLang(lang);

  return <LangContext.Provider value={{ change, language }}>{children}</LangContext.Provider>;
};
