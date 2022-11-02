import React, { useEffect } from "react";
import { useContext } from "react";
import { LangContext, QuestionsContext } from "hooks/usecontext";
import { files } from "tools/const";
import { Langs } from "hooks/types";

const fetchQuestions = async (lang: Langs) => {
  const url = files[lang];
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.log(err);
  }

  const rawLines = await response?.text();
};

const Questionsanswers = (): JSX.Element => {
  const { language } = useContext(LangContext);
  const { questions } = useContext(QuestionsContext);
  useEffect(() => {
    const langQuestion = questions[language];
    if (!langQuestion) {
      fetchQuestions(language);
    }
    console.log(langQuestion);
  }, [language]);

  return <div>{language}</div>;
};

export default Questionsanswers;
