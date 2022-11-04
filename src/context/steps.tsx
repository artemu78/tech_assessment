import React, { useState } from "react";
import { IProps } from "./types";

export interface IStepContext {
  step: number;
  change: (step: number) => void;
}

export const StepContext = React.createContext<IStepContext>({
  step: 0,
  change: () => {},
});

export const StepProvider = ({ children }: IProps) => {
  const [step, setStep] = useState<number>(0);
  const change = (step: number): void => setStep(step);

  return <StepContext.Provider value={{ change, step }}>{children}</StepContext.Provider>;
};
