import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, Icon } from "@mui/material";
import cn from "classnames";
import CheckIcon from "@mui/icons-material/Check";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { IQuizItem, IAnswer } from "hooks/types";
import styles from "./styles.module.css";

enum EquizItemState {
  NEW,
  RIGHT,
  WRONG,
}

export const QuizItem = ({ quizItem }: { quizItem: IQuizItem }): JSX.Element => {
  const [quizItemState, setQuizItemState] = useState<EquizItemState>(EquizItemState.NEW);

  const onChange = (answerItem: IAnswer) => {
    return () => {
      if (quizItemState !== EquizItemState.NEW) return;
      if (answerItem.isCorrect) setQuizItemState(EquizItemState.RIGHT);
      else setQuizItemState(EquizItemState.WRONG);
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
                onClick={onChange(answer)}
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
        {quizItem.description.map((descrLine) => (
          <div>{descrLine}</div>
        ))}
      </code>
    </div>
  );
};
