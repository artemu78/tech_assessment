import React, {useState} from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { setCookie } from 'tools';

const LangSelector = () => {
  const [ language, setLanguageState ] = useState("");
  const setLanguage = (someshit: SelectChangeEvent) => {
    const shit = (someshit?.target as any)?.value;
    setLanguageState(shit);
    setCookie("prog_lang", shit);
    debugger;

  }

  return (
    <Box sx={{ minWidth: 120, width: 200}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose assessment language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Choose assessment language"
          onChange={setLanguage}
          value={language}
        >
          <MenuItem value={"react"}>React</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LangSelector;
