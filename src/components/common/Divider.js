import { COLOR } from "@/assets/constant";
import { Box, Typography } from "@mui/material";
import React from "react";

function Divider() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
    >
      <Box
        color={COLOR.primary_acent}
        sx={{
          width: "40%",
          height: "1px",
          color: COLOR.primary_acent,
        }}
      />
      <Typography>OR</Typography>
      <Box
        color={COLOR.primary_acent}
        sx={{
          width: "40%",
          height: "1px",
          color: COLOR.primary_acent,
        }}
      />
    </Box>
  );
}

export default Divider;
