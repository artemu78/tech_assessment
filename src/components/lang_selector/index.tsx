import React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const LangSelector = () => {
  return (
    <Box sx={{ minWidth: 120, width: 200}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose assessment language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Choose assessment language"
        >
          <MenuItem value={10}>React</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default LangSelector;
