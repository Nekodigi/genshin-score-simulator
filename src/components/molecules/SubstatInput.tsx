import { Autocomplete, Box, MenuItem, Select, TextField } from "@mui/material";
import { NumberInput } from "../atoms/NumberInput";
import { substatDef } from "../../utils/consts/Substat";
import { SubstatKeys } from "../../utils/types/Substat";
import { useState } from "react";

type SubstatInputProps = {
  setKey: (value: SubstatKeys) => void;
  key_?: SubstatKeys;
  setValue: (value: number) => void;
  value?: number;
};

export const SubstatInput = (props: SubstatInputProps) => {
  const { setKey, key_, setValue, value } = props;

  const options = Object.keys(substatDef).map((substat) => {
    return substat as SubstatKeys;
  });

  return (
    <Box display="flex" sx={{ mb: 1 }}>
      <Select
        value={key_}
        size="small"
        sx={{ width: 200 }}
        onChange={(e) =>
          e.target.value && setKey(e.target.value as SubstatKeys)
        }
      >
        {Object.keys(substatDef).map((key, i) => {
          return (
            <MenuItem key={i} value={key}>
              {substatDef[key].name}
            </MenuItem>
          );
        })}
      </Select>
      <NumberInput
        min={0}
        value={value}
        setValue={setValue}
        textFieldProps={{ inputProps: { style: { textAlign: "right" } } }}
      />
    </Box>
  );
};
