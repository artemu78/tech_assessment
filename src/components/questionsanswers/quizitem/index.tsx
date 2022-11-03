import { useState, useContext } from "react";
import { Checkbox, FormControlLabel, FormGroup, Icon } from "@mui/material";
import cn from "classnames";
import CheckIcon from "@mui/icons-material/Check";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { IQuizItem, IAnswer, EquizItemState, IQuizItemResult } from "hooks/types";
import { ResultsContext, LangContext } from "hooks/usecontext";
import styles from "./styles.module.css";

interface Props {
  quizItem: IQuizItem;
  questionIndex: number;
}

export const QuizItem = ({ quizItem, questionIndex }: Props): JSX.Element => {
  const answersResults = useContext(ResultsContext);
  const { language } = useContext(LangContext);
  const [quizItemState, setQuizItemState] = useState<EquizItemState>(EquizItemState.NEW);

  const onChange = (answerItem: IAnswer, index: number) => {
    return () => {
      if (quizItemState !== EquizItemState.NEW) return;
      if (answerItem.isCorrect) setQuizItemState(EquizItemState.RIGHT);
      else setQuizItemState(EquizItemState.WRONG);
      const answerResult: IQuizItemResult = {
        result: answerItem.isCorrect ? EquizItemState.RIGHT : EquizItemState.WRONG,
        answer: index,
      };
      answersResults.change(language, index, answerResult);
    };
  };

  let icon;
  if (quizItemState === EquizItemState.NEW) icon = null;
  if (quizItemState === EquizItemState.WRONG) icon = <DangerousIcon />;
  if (quizItemState === EquizItemState.RIGHT) icon = <CheckIcon />;

  const itemStateIsNew = quizItemState === EquizItemState.NEW;
  return (
    <div>
      <h2>
        <>
          {icon} {quizItem.question}
        </>
      </h2>
      <code>
        <pre>{quizItem.explanation.join("\n")}</pre>
      </code>
      <FormGroup>
        <ul>
          {quizItem.answers.map((answer, index) => {
            return (
              <li
                key={index + answer.text}
                className={cn({ [styles.highlight]: itemStateIsNew })}
                onClick={onChange(answer, index)}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={(answer.isCorrect && !itemStateIsNew) || false}
                      disabled={!itemStateIsNew}
                    />
                  }
                  label={answer.isCorrect.toString() + answer.text}
                  disabled={!itemStateIsNew}
                />
                <br />
                {answer.description}
              </li>
            );
          })}
        </ul>
      </FormGroup>
      <code>
        {quizItem.description.map((descrLine, index) => (
          <div key={index}>{descrLine}</div>
        ))}
      </code>
    </div>
  );
};
