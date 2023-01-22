/** @jsxImportSource @emotion/react */

import { SxProps, TextField, useTheme } from "@mui/material";
import { fontTypes } from "../../utils/styles/fonts";
import { useState } from "react";

type NumberInputProps = {
  value: number;
  setValue: (value: number) => void;
  min?: number;
  max?: number;
  sx?: SxProps;
};
export const NumberInput = ({
  value,
  setValue,
  min,
  max,
  sx,
}: NumberInputProps) => {
  const theme = useTheme();
  const [inValue, setInValue] = useState(value);

  return (
    <TextField
      type="number"
      variant="standard"
      style={{
        background: theme.palette.local.paper,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
      }}
      sx={sx}
      css={fontTypes(theme).disc}
      value={isNaN(value) ? inValue : value}
      onChange={(e) => {
        setInValue(parseFloat(e.target.value));
        if (e.target.value !== "") setValue(parseFloat(e.target.value));
        else setValue(0);
      }}
      onFocus={(event) => {
        event.target.select();
      }}
      InputProps={{ disableUnderline: true }}
      inputProps={{
        min: min,
        max: max,
        inputMode: "numeric",
      }}
    />
  );
};
