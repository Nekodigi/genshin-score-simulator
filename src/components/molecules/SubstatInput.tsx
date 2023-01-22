/** @jsxImportSource @emotion/react */

import { Box, MenuItem, Select, useTheme } from "@mui/material";
import { NumberOption } from "./NumberOption";
import { fontTypes } from "../../utils/styles/fonts";
import { substatKey, substatKeyType } from "../../utils/consts/Substat";
import { statDef } from "../../utils/consts/Stat";
import { StatIcon } from "../atoms/StatIcon";

type SubstatInputProps = {
  setKey: (value: substatKeyType) => void;
  key_: substatKeyType;
  setValue: (value: number) => void;
  value: number;
};

export const SubstatInput = (props: SubstatInputProps) => {
  const { setKey, key_, setValue, value } = props;
  const theme = useTheme();

  return (
    <Box display="flex" sx={{ mb: 1 }}>
      <Select
        value={key_}
        variant="standard"
        size="small"
        css={[fontTypes(theme).disc, { color: theme.palette.com.white }]}
        sx={{
          width: 128,
          bgcolor:
            key_ === "ERR"
              ? theme.palette.com.main[500]
              : theme.palette.com.main.L500,
          pl: 1.5,
          pt: 0.5,
          borderRadius: 0.5,
          color: theme.palette.com.white,
          height: 32,
        }}
        onChange={(e) =>
          e.target.value !== undefined &&
          setKey(e.target.value as substatKeyType)
        }
        disableUnderline
      >
        {substatKey.map((key, i) => {
          return (
            <MenuItem
              key={i}
              value={key}
              css={fontTypes(theme).disc}
              sx={{ minHeight: 0, display: "flex", alignItems: "center" }}
            >
              <StatIcon statKey={key} />
              {/* {substatDef[key].name} */}
            </MenuItem>
          );
        })}
      </Select>
      <NumberOption
        value={value}
        setValue={setValue}
        options={statDef[key_].table as any as number[]}
      />
    </Box>
  );
};
