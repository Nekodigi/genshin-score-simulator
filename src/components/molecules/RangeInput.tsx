/** @jsxImportSource @emotion/react */

import { Box, Slider, Typography, useTheme } from "@mui/material";
import { css } from "@emotion/react";
import { fontTypes } from "../../utils/styles/fonts";
import { useState } from "react";

type RangeInputProps = {
  name: string;
  min: number;
  max: number;
  value: number[];
  setValue: (value: number[]) => void;
};
export const RangeInput = (props: RangeInputProps) => {
  const { name, min, max, value, setValue } = props;
  const theme = useTheme();

  return (
    <Box
      display="flex"
      height={32}
      alignItems="center"
      px={1}
      sx={{ background: theme.palette.local.paper }}
      gap={1}
      borderRadius={1}
    >
      <Typography
        css={[fontTypes(theme).disc, { minWidth: 126 }]}
      >{`${name}: ${value[0]} ~ ${value[1]}`}</Typography>
      <Box display="flex" flexGrow={1} alignItems="center" px={1}>
        <Slider
          step={1}
          min={min}
          max={max}
          value={value}
          onChange={(e, newValue) => setValue(newValue as number[])}
          valueLabelDisplay="auto"
          sx={{ color: theme.palette.com.main["A100"] }}
        />
      </Box>
    </Box>
  );
};
