import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setCookie } from "tools";
import { files } from "tools/const";
import { LangContext, QuestionsContext } from "hooks/usecontext";
import styles from "./styles.module.css";

const LangSelector = () => {
  // const [ language, setLanguageState ] = useState("");
  const { language, change } = useContext(LangContext);
  const { questions } = useContext(QuestionsContext);

  const setLanguage = (someshit: SelectChangeEvent) => {
    const shit = (someshit?.target as any)?.value;
    // setLanguageState(shit);
    setCookie("prog_lang", shit);
    shit !== language && change(shit);
  };

  const menuItems = [];

  for (let code in files) {
    const name = files[code as keyof typeof files].name;
    menuItems.push(<MenuItem value={code}>{name || "no name"}</MenuItem>);
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
      <div>{questions[language]?.length}</div>
    </div>
  );
};

export default LangSelector;
