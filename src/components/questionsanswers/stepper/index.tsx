import { useContext, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { QuizItem } from "./../quizitem";
import { IQuizItem } from "context/types";
import { StepContext } from "context/usecontext";

interface StepsProps {
  questions: IQuizItem[] | undefined;
  language: string;
}

export default function Stepper({ questions, language }: StepsProps) {
  const theme = useTheme();
  const nextButton = useRef<HTMLButtonElement | null>(null);
  const { step: activeStep, setStep: setActiveStep } = useContext(StepContext);
  // const [thisLanguageActiveStep, setActiveStepIndex] = useState<number>(activeStep[language] || 0);
  const thisLanguageActiveStep = activeStep[language] || 0;
  const maxSteps = questions?.length || 0;

  useEffect(() => {
    nextButton?.current?.blur();
  }, [thisLanguageActiveStep]);

  const handleNext = () => {
    setActiveStep(language, thisLanguageActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(language, thisLanguageActiveStep - 1);
  };

  if (!questions) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ width: "100%" }}>
        <QuizItem
          key={activeStep + questions[thisLanguageActiveStep].question}
          quizItem={questions[thisLanguageActiveStep]}
          questionIndex={thisLanguageActiveStep}
          nextButtonRef={nextButton?.current}
        />
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={thisLanguageActiveStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={thisLanguageActiveStep === maxSteps - 1}
            ref={nextButton}
            onFocus={(e): void => {
              e.target.classList.add("Mui-focusVisible");
            }}
          >
            Next
            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={thisLanguageActiveStep === 0}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
}
