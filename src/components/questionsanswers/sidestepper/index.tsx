import { useContext, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import { SxProps } from "@mui/system";
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
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const { step: activeStep, setStep: setActiveStep } = useContext(StepContext);
  const activeStepIndex = activeStep[language] || 0;
  useEffect(() => {
    const el = stepRefs.current[activeStepIndex];
    if (!el || window.innerWidth < 500) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }, [activeStepIndex]);

  if (!questions) return null;
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStepIndex} orientation="vertical">
        {questions.map((step, index) => {
          const thisAnswerResult = (answersResults[language] as IQuizItemResult[])[index]?.result;
          let icon: JSX.Element | null = null;
          if (thisAnswerResult === EquizItemState.WRONG) icon = <DangerousIcon />;
          if (thisAnswerResult === EquizItemState.RIGHT) icon = <CheckIcon />;
          const sx: SxProps | null = activeStepIndex === index ? { fontWeight: "bold" } : null;
          return (
            <Step
              key={index + step.question}
              onClick={() => setActiveStep(language, index)}
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              ref={(elem) => {
                elem && (stepRefs.current[index] = elem);
              }}
            >
              <StepLabel icon={icon}>
                <Typography sx={sx}>{step.question}</Typography>
              </StepLabel>
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
