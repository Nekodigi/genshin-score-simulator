import { SxProps, TextField, TextFieldProps } from "@mui/material";
import React, { useState } from "react";

type NumberInputProps = {
  min: number;
  max?: number;
  setValue: (value: number) => void;
  isInt?: boolean;
  sx?: SxProps;
  textFieldProps?: TextFieldProps;
};

export const NumberInput = (props: NumberInputProps) => {
  const { min, max, setValue, isInt, sx, textFieldProps } = props;
  const [preValue, setPreValue] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let raw = e.target.value;

    let num = Number(raw);
    let moreThenMin = Math.max(num, min);
    let processed = max ? Math.min(moreThenMin, max) : moreThenMin;
    setValue(processed);
    console.log(String(processed));
    setPreValue(String(processed));
  };

  return (
    <TextField
      value={preValue}
      onChange={(e) => onChange(e)}
      onKeyPress={(event) => {
        //accept only number
        if (isInt && !/[0-9]/.test(event.key)) {
          event.preventDefault();
        }
      }}
      label="Level"
      type="number"
      size="small"
      fullWidth
      sx={sx}
      {...textFieldProps}
    />
  );
};
