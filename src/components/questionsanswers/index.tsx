import { useEffect, useContext } from "react";
import { LangContext, QuestionsContext } from "hooks/usecontext";
import { files } from "tools/const";
import { Langs, IQuizItem } from "hooks/types";
import { parseRawMDFile } from "tools";
import { QuizItem } from "./quizitem";

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
  const { questions, change } = useContext(QuestionsContext);

  useEffect(() => {
    const langQuiz = questions[language];
    if (!langQuiz) {
      fetchQuestions(language).then((quiz) => {
        questions[language] = quiz || undefined;
        change({ ...questions });
      });
    }
  }, [language, change, questions]);

  return (
    <div>
      {language &&
        questions[language]?.map((question, index) => {
          return <QuizItem key={index + question.question} quizItem={question} />;
        })}
    </div>
  );
};

export default Questionsanswers;
