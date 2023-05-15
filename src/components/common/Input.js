import React from "react";

import { styled } from "@mui/system";
import { TextField } from "@mui/material";

import { COLOR } from "@/assets/constant";

const StyledTextField = styled(TextField)`
  & label.Mui-focused {
    color: ${COLOR.primary};
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: ${COLOR.primary};
    }
  }
`;

function Input({ onChange, label, required = false, value }) {
  return (
    <StyledTextField
      required={required}
      type={label.includes("assword") ? "password" : "text"}
      fullWidth
      onChange={onChange}
      label={label}
      size="small"
      value={value}
      sx={{
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#d0c2e5",
        },
      }}
      InputLabelProps={{
        style: {
          color: COLOR.primary,
        },
      }}
    />
  );
}

export default Input;
