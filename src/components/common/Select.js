import React from "react";
import { COLOR } from "@/assets/constant";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { styled } from "@mui/system";

const StyledSelect = styled(Select)`
  & label.Mui-focused {
    color: ${COLOR.primary};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${COLOR.primary};
    }
  }
`;

function CustomSelect({ value, onChange, options = [], required = false }) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel id="demo-simple-select-label">Product type</InputLabel>
      <StyledSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label="Product type"
        onChange={onChange}
        sx={{
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d0c2e5",
          },
        }}
        required={required}
      >
        {options.map((item, i) => (
          <MenuItem key={i} value={item}>
            {item}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
}

export default CustomSelect;
