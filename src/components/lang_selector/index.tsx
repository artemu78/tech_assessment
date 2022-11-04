import { useContext, useMemo } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setCookie } from "tools";
import { files } from "tools/const";
import { LangContext, QuestionsContext, ResultsContext } from "context/usecontext";
import styles from "./styles.module.css";
import { IQuizItemResult, EquizItemState } from "context/types";

// import SkipNextIcon from "@mui/icons-material/SkipNext";
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

const LangSelector = () => {
  const { language, change } = useContext(LangContext);
  const { questions } = useContext(QuestionsContext);
  const answersResults = useContext(ResultsContext);

  const setLanguage = (changeEvent: SelectChangeEvent) => {
    const langCode = (changeEvent?.target as any)?.value;
    setCookie("prog_lang", langCode);
    langCode !== language && change(langCode);
  };

  const calculatedResults = useMemo(
    () => calcResult(answersResults[language] as IQuizItemResult[]),
    [language, answersResults]
  );

  const menuItems = [];

  for (let code in files) {
    const name = files[code as keyof typeof files].name;
    menuItems.push(
      <MenuItem value={code} key={code}>
        {name || "no name"}
      </MenuItem>
    );
  }

  return (
    <div className={styles.container}>
      <FormControl sx={{ minWidth: 120, width: 300 }}>
        <InputLabel id="demo-simple-select-label">Choose assessment</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Choose assessment language"
          onChange={setLanguage}
          value={language || undefined}
        >
          {menuItems}
        </Select>
      </FormControl>
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
  );
};

export default LangSelector;
