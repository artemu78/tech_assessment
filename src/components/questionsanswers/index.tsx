import { useContext } from "react";
import { LangContext } from "hooks/usecontext";

const Questionsanswers = (): JSX.Element => {
  const { value } = useContext(LangContext);
  return <div>{value}</div>;
};

export default Questionsanswers;
