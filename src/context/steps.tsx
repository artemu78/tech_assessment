import React, { useState } from "react";
import { IProps } from "./types";

export interface IStepContext {
  step: { [key: string]: number };
  setStep: (language: string, step: number) => void;
}

export const StepContext = React.createContext<IStepContext>({
  step: {},
  setStep: (language: string, step: number) => {},
});

export const StepProvider = ({ children }: IProps) => {
  const [step, setStep] = useState<{ [key: string]: number }>({});
  const change = (language: string, stepNumber: number): void => {
    const newStep = {
      ...step,
      [language]: stepNumber,
    };
    setStep(newStep);
  };

  return <StepContext.Provider value={{ setStep: change, step }}>{children}</StepContext.Provider>;
};
