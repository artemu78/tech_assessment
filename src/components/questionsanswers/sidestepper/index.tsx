import { useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckIcon from "@mui/icons-material/Check";

import { StepContext, ResultsContext } from "context/usecontext";
import { IQuizItem, EquizItemState, IQuizItemResult } from "context/types";

interface StepsProps {
  questions: IQuizItem[] | undefined;
  language: string;
}

export default function VerticalLinearStepper({ questions, language }: StepsProps) {
  const answersResults = useContext(ResultsContext);
  const { step: activeStep, change: setActiveStep } = useContext(StepContext);

  if (!questions) return null;

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {questions.map((step, index) => {
          const thisAnswerResult = (answersResults[language] as IQuizItemResult[])[index]?.result;
          let icon = null;
          if (thisAnswerResult === EquizItemState.WRONG) icon = <DangerousIcon />;
          if (thisAnswerResult === EquizItemState.RIGHT) icon = <CheckIcon />;

          return (
            <Step
              key={step.question}
              onClick={() => setActiveStep(index)}
              sx={{ cursor: "pointer" }}
            >
              <StepLabel icon={icon}>{step.question}</StepLabel>
              <StepContent>
                <Typography>{step.description}</Typography>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
