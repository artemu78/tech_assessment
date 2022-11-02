import React, { useEffect, useContext, useState } from "react";
import { LangContext, QuestionsContext } from "hooks/usecontext";
import { files } from "tools/const";
import { Langs, IQuestion } from "hooks/types";
import { parseRawMDFile } from "tools";

const fetchQuestions = async (lang: Langs): Promise<IQuestion[] | null> => {
  const url = files[lang];
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
        change(questions);
      });
    }
  }, [language]);

  console.log(questions[language], "questions[language]");
  console.log(language, "language");

  return (
    <div>
      {language &&
        questions[language]?.map((question, index) => {
          return <SingleQuizItem key={index + question.question} quizItem={question} />;
        })}
    </div>
  );
};

const SingleQuizItem = ({ quizItem }: { quizItem: IQuestion }): JSX.Element => {
  return (
    <div>
      <h2>{quizItem.question}</h2>
      <code>{quizItem.description}</code>
      <ul>
        {quizItem.answers.map((answer) => {
          return <li>{answer}</li>;
        })}
      </ul>
      <code>{quizItem.explanation}</code>
    </div>
  );
};

export default Questionsanswers;
