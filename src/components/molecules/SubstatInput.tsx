import { Autocomplete, Box, TextField } from "@mui/material";
import { NumberInput } from "../atoms/NumberInput";
import { substatDef } from "../../utils/consts/Substat";
import { SubstatKeys } from "../../utils/types/Substat";

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
      <Autocomplete
        options={options}
        value={key_}
        size="small"
        autoHighlight={true}
        sx={{ width: 200, borderRadius: 20 }}
        onChange={(e, newValue) => newValue && setKey(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            InputLabelProps={{ shrink: true }}
            label="Substatus"
          />
        )}
      />
      <NumberInput
        min={0}
        value={value}
        setValue={setValue}
        textFieldProps={{ inputProps: { style: { textAlign: "right" } } }}
      />
    </Box>
  );
};
