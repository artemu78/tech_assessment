import { useContext, useMemo } from "react";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { setCookie } from "tools";
import { quizMetaData, IQuizMetadataItem, IQuizCode } from "tools/const";
import { LangContext, QuestionsContext, ResultsContext } from "context/usecontext";
import styles from "./styles.module.css";
import { IQuizItemResult, EquizItemState } from "context/types";

import CheckIcon from "@mui/icons-material/Check";
import DangerousIcon from "@mui/icons-material/Dangerous";

interface ICalcResult {
  right: number;
  wrong: number;
  skipped: number;
}

const calcResult = (results: IQuizItemResult[]): ICalcResult => {
  const right = results?.filter((result) => result.result === EquizItemState.RIGHT).length || 0;
  const wrong = results?.filter((result) => result.result === EquizItemState.WRONG).length || 0;
  const skipped = results?.filter((result) => result.result === EquizItemState.SKIPPED).length || 0;
  return { right, wrong, skipped };
};

const QuizCodeSelector = () => {
  const { language, change } = useContext(LangContext);
  const { questions } = useContext(QuestionsContext);
  const answersResults = useContext(ResultsContext);

  const calculatedResults = useMemo(
    () => calcResult(answersResults[language] as IQuizItemResult[]),
    [language, answersResults]
  );

  const flattenedQuizMetaData: IQuizMetadataItem[] = [];

  const menuItems: JSX.Element[] = [];
  for (let code in quizMetaData) {
    const quizDefItem = quizMetaData[code as keyof typeof quizMetaData];
    const name = quizDefItem.name;
    flattenedQuizMetaData.push(quizDefItem);
    menuItems.push(
      <MenuItem value={code} key={code}>
        {name || "no name"}
      </MenuItem>
    );
  }

  const setLanguage = (changeEvent: React.SyntheticEvent, value: IQuizMetadataItem | null) => {
    const langCode = (value?.code || "") as IQuizCode;
    setCookie("prog_lang", langCode);
    langCode !== language && change(langCode);
  };

  return (
    <div className={styles.container}>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={flattenedQuizMetaData}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Choose assessment language" />}
        getOptionLabel={(option) => option.name}
        onChange={setLanguage}
        value={quizMetaData[language]}
      />
      <div className={styles.answers}>
        <div>answers</div>
        <div className={styles.results}>
          <div title="correct">
            <CheckIcon />
            &nbsp;{calculatedResults.right}
          </div>
          <div title="wrong">
            <DangerousIcon />
            &nbsp;{calculatedResults.wrong}
          </div>
          {/* <div title="skipped">
          <SkipNextIcon />
          &nbsp;{calculatedResults.skipped}
        </div> */}
        </div>
        <div> of {questions[language]?.length} total questions</div>
      </div>
    </div>
  );
};

export default QuizCodeSelector;
