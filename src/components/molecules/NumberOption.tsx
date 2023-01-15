/** @jsxImportSource @emotion/react */

import { faArrowUpWideShort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { fontTypes } from "../../utils/styles/fonts";
import { css } from "@emotion/react";
import { useState } from "react";

type NumberOptionProps = {
  value: number;
  setValue: (value: number) => void;
  options: number[];
  displayRaw?: boolean;
};

//Display value will be rounded!
//x < 10 digit 1 after decimal point
//x > 10 integer

export const NumberOption = (props: NumberOptionProps) => {
  const { value, setValue, options, displayRaw } = props;
  const theme = useTheme();
  const disc = css([
    fontTypes(theme).disc,
    { textTransform: "none", color: theme.palette.com.white },
  ]);

  const DisplayRounded = (value: number) => {
    if (displayRaw === undefined || displayRaw === false) {
      if (value < 10) {
        return value.toFixed(1);
      } else {
        return value.toFixed(0);
      }
    } else {
      return value;
    }
  };

  const InputRounded = (value: number) => {
    if (displayRaw === undefined || displayRaw === false) {
      if (value < 10) {
        return Math.round(value * 10) / 10;
      } else {
        return Math.round(value);
      }
    } else {
      return value;
    }
  };

  return (
    <ButtonGroup
      variant="contained"
      aria-label="outlined primary button group"
      sx={{ height: 32, flexGrow: 1 }}
      css={disc}
    >
      <TextField
        type="number"
        variant="standard"
        sx={{
          bgcolor: theme.palette.local.paper,
          px: 1,
          borderRadius: 0.5,
          width: 48,
        }}
        css={fontTypes(theme).disc}
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        onFocus={(event) => {
          event.target.select();
        }}
        InputProps={{ disableUnderline: true }}
        inputProps={{
          min: options[0],
          max: options[options.length - 1],
        }}
      />
      {options.map((option, i) => (
        <Button
          key={i}
          onClick={() => setValue(InputRounded(option))}
          sx={{
            bgcolor: theme.palette.com.main[200 + i * 100],
            ":focus": {
              bgcolor: theme.palette.local.bg,
            },
            borderRadius: i === 0 ? 0 : "inherit",
            flexGrow: 1,
            px: 0,
          }}
        >
          {DisplayRounded(option)}
        </Button>
      ))}
    </ButtonGroup>
  );
};
