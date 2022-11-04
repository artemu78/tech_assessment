import { useContext } from "react";
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
}

export default function Stepper({ questions }: StepsProps) {
  const theme = useTheme();
  const { step: activeStep, change: setActiveStep } = useContext(StepContext);
  const maxSteps = questions?.length || 0;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (!questions) return null;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ width: "100%" }}>
        <QuizItem
          key={activeStep + questions[activeStep].question}
          quizItem={questions[activeStep]}
          questionIndex={activeStep}
        />
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
    </Box>
  );
}
