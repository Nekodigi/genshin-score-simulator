import { Autocomplete, Box, TextField } from "@mui/material";
import { NumberInput } from "../atoms/NumberInput";
import React, { useMemo } from "react";
import { substatDef } from "../../utils/consts/Substat";
import { SubstatKeys } from "../../utils/types/Substat";

type SubstatInputProps = {
  setKey: (value: SubstatKeys) => void;
  setValue: (value: number) => void;
};

export const SubstatInput = (props: SubstatInputProps) => {
  const { setKey, setValue } = props;

  const options = Object.keys(substatDef).map((substat) => {
    return substat as SubstatKeys;
  });

  return (
    <Box display="flex" sx={{ mb: 1 }}>
      <Autocomplete
        options={options}
        size="small"
        autoHighlight={true}
        sx={{ width: 200 }}
        onChange={(e, newValue) => newValue && setKey(newValue)}
        renderInput={(params) => <TextField {...params} label="Substatus" />}
      />
      <NumberInput
        min={0}
        setValue={setValue}
        textFieldProps={{ inputProps: { style: { textAlign: "right" } } }}
      />
    </Box>
  );
};
