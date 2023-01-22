/** @jsxImportSource @emotion/react */

import { Box, useTheme } from "@mui/material";
import { statKeyType } from "../../utils/consts/Stat";
import { NumberInput } from "../atoms/NumberInput";
import { StatIcon } from "../atoms/StatIcon";

type WeightInputProps = {
  statKey: statKeyType;
  value: number;
  setValue: (value: number) => void;
};
export const WeightInput = ({ statKey, value, setValue }: WeightInputProps) => {
  const theme = useTheme();
  return (
    <Box display="flex" borderRadius={1}>
      <Box
        display="flex"
        alignItems="centers"
        bgcolor={theme.palette.com.main[500]}
        pl={1}
        minWidth={112}
      >
        <StatIcon statKey={statKey} />
      </Box>
      <NumberInput value={value} setValue={setValue} />
    </Box>
  );
};
