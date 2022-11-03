import { useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { IQuizItem } from "hooks/types";
import styles from "./styles.module.css";
export const QuizItem = ({ quizItem }: { quizItem: IQuizItem }): JSX.Element => {
  return (
    <div>
      <h2>{quizItem.question}</h2>
      <code>
        <pre>{quizItem.explanation.join("\n")}</pre>
      </code>
      <FormGroup>
        <ul>
          {quizItem.answers.map((answer, index) => {
            return (
              <li key={index + answer.text} className={styles.quizitem}>
                <FormControlLabel
                  control={<Checkbox checked={answer.isCorrect || false} />}
                  label={answer.text}
                />
                <br />
                {answer.description}
              </li>
            );
          })}
        </ul>
      </FormGroup>
      <code>
        <pre>{quizItem.description.join("\n")}</pre>
      </code>
    </div>
  );
};
