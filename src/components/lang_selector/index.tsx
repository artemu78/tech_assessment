import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setCookie } from "tools";
import { LangContext } from "hooks/usecontext";

const LangSelector = () => {
  // const [ language, setLanguageState ] = useState("");
  const { value, change } = useContext(LangContext);
  const setLanguage = (someshit: SelectChangeEvent) => {
    const shit = (someshit?.target as any)?.value;
    // setLanguageState(shit);
    setCookie("prog_lang", shit);
    shit !== value && change(shit);
  };

  return (
    <Box sx={{ minWidth: 120, width: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose assessment language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Choose assessment language"
          onChange={setLanguage}
          value={value}
        >
          <MenuItem value={"react"}>React</MenuItem>
          <MenuItem value={"css"}>CSS</MenuItem>
          <MenuItem value={"html"}>HTML</MenuItem>
          <MenuItem value={"javascript"}>Javascript</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LangSelector;
