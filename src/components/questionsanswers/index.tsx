import { useEffect, useContext } from "react";

import { LangContext, QuestionsContext, ResultsContext, StepProvider } from "context/usecontext";
import { files } from "tools/const";
import { Langs, IQuizItem } from "context/types";
import { parseRawMDFile } from "tools";

import VerticalStepper from "./sidestepper";
import Stepper from "./stepper";

import styles from "./styles.module.css";

const fetchQuestions = async (lang: Langs): Promise<IQuizItem[] | null> => {
  const url = files[lang].url;
  let response;
  try {
    response = await fetch(url);
  } catch (err) {
    console.log(err);
    return null;
  }

  const rawLines = await response?.text();
  if (rawLines?.length) {
    return parseRawMDFile(rawLines);
  } else {
    console.log("no data from", url);
    return null;
  }
};

const Questionsanswers = (): JSX.Element => {
  const { language } = useContext(LangContext);
  const { init: resultsInit } = useContext(ResultsContext);
  const { questions, change: changeQuestions } = useContext(QuestionsContext);

  useEffect(() => {
    const langQuiz = questions[language];
    if (!langQuiz) {
      fetchQuestions(language).then((quiz) => {
        questions[language] = quiz || undefined;
        changeQuestions({ ...questions });
        resultsInit(language);
      });
    }
  }, [language, changeQuestions, questions]);

  return (
    <div className={styles.container}>
      <StepProvider>
        <>
          <VerticalStepper questions={questions[language]} language={language} />
          <Stepper questions={questions[language]} />
        </>
      </StepProvider>
    </div>
  );
};

export default Questionsanswers;
