import { useContext } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Remarkable } from "remarkable";
import cn from "classnames";
import CheckIcon from "@mui/icons-material/Check";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { IQuizItem, IAnswer, EquizItemState, IQuizItemResult } from "context/types";
import { quizMetaData } from "tools/const";
import { ResultsContext, LangContext } from "context/usecontext";
import styles from "./styles.module.css";

interface Props {
  quizItem: IQuizItem;
  questionIndex: number;
  nextButtonRef: HTMLButtonElement | null;
}

export const QuizItem = ({ quizItem, questionIndex, nextButtonRef }: Props): JSX.Element => {
  const answersResults = useContext(ResultsContext);
  const { language } = useContext(LangContext);
  var md = new Remarkable();
  let quizItemState = EquizItemState.NEW;
  let userAnswerIndex: null | number = null;
  const thisAnswerResult = (answersResults[language] as IQuizItemResult[])[questionIndex];
  if (thisAnswerResult) {
    quizItemState = thisAnswerResult.result;
    userAnswerIndex = thisAnswerResult.answer;
  }
  const mdFileUrl = quizMetaData[language].url;
  const basePath = mdFileUrl
    .split("/")
    .slice(0, mdFileUrl.split("/").length - 1)
    .join("/");

  const onChange = (answerItem: IAnswer, index: number) => {
    return () => {
      if (quizItemState !== EquizItemState.NEW) return;
      nextButtonRef?.focus();
      const answerResult: IQuizItemResult = {
        result: answerItem.isCorrect ? EquizItemState.RIGHT : EquizItemState.WRONG,
        answer: index,
      };
      answersResults.change(language, questionIndex, answerResult);
    };
  };

  let icon: JSX.Element | null = null;
  if (quizItemState === EquizItemState.WRONG) icon = <DangerousIcon />;
  if (quizItemState === EquizItemState.RIGHT) icon = <CheckIcon />;
  const itemStateIsNew = quizItemState === EquizItemState.NEW;

  const titleClassName = cn({
    [styles.titleDefault]: quizItemState === EquizItemState.NEW,
    [styles.titleWrong]: quizItemState === EquizItemState.WRONG,
    [styles.titleRight]: quizItemState === EquizItemState.RIGHT,
  });

  const srcRegex = /src=(['"])(.*)(['"])/g;
  const explanation = md.render(quizItem.explanation).replace(srcRegex, `src=$1${basePath}/$2$3`);
  const description = md.render(quizItem.description).replace(srcRegex, `src=$1${basePath}/$2$3`);

  return (
    <div>
      <h2 className={titleClassName}>
        <>
          {icon} {quizItem.question}
        </>
      </h2>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: explanation }} />
      </pre>
      <FormGroup>
        <ul>
          {quizItem.answers.map((answer, index) => {
            const sadFace =
              quizItemState === EquizItemState.WRONG && index === userAnswerIndex ? (
                <SentimentVeryDissatisfiedIcon />
              ) : null;
            const smileFace =
              quizItemState === EquizItemState.RIGHT && index === userAnswerIndex ? (
                <SentimentSatisfiedAltIcon />
              ) : null;
            const answerDescription = md
              .render(answer.description)
              .replace(srcRegex, `src=$1${basePath}/$2$3`);
            return (
              <li
                key={index + answer.text}
                className={cn({ [styles.highlight]: itemStateIsNew })}
                onClick={onChange(answer, index)}
              >
                <div className={styles.listItem}>
                  {sadFace}
                  {smileFace}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={(answer.isCorrect && !itemStateIsNew) || false}
                        disabled={!itemStateIsNew}
                      />
                    }
                    label={answer.text}
                    disabled={!itemStateIsNew}
                  />
                  <br />
                </div>
                <pre>
                  <code
                    className={styles.answerDescription}
                    dangerouslySetInnerHTML={{ __html: answerDescription }}
                  />
                </pre>
              </li>
            );
          })}
        </ul>
      </FormGroup>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: description }} />
      </pre>
    </div>
  );
};
