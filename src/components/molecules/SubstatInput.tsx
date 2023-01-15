/** @jsxImportSource @emotion/react */

import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { NumberInput } from "../atoms/NumberInput";
import { substatDef } from "../../utils/consts/Substat";
import { SubstatKeys } from "../../utils/types/Substat";
import { useState } from "react";
import { NumberOption } from "./NumberOption";
import { fontTypes } from "../../utils/styles/fonts";
import { style, textAlign } from "@mui/system";
import FontAwesomeSvgIcon from "../atoms/FontAwesomeSvgIcon";
import { faAtk } from "../atoms/faIcons/index";
import { SubstatIcon } from "../atoms/SubstatIcon";

type SubstatInputProps = {
  setKey: (value: SubstatKeys) => void;
  key_?: SubstatKeys;
  setValue: (value: number) => void;
  value: number;
};

export const SubstatInput = (props: SubstatInputProps) => {
  const { setKey, key_, setValue, value } = props;
  const theme = useTheme();

  const options = Object.keys(substatDef).map((substat) => {
    return substat as SubstatKeys;
  });

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
          e.target.value && setKey(e.target.value as SubstatKeys)
        }
        disableUnderline
      >
        {Object.keys(substatDef).map((key, i) => {
          return (
            <MenuItem
              key={i}
              value={key}
              css={fontTypes(theme).disc}
              sx={{ minHeight: 0, display: "flex", alignItems: "center" }}
            >
              <SubstatIcon statKey={key as SubstatKeys} />
              {/* {substatDef[key].name} */}
            </MenuItem>
          );
        })}
      </Select>
      <NumberOption
        value={value}
        setValue={setValue}
        options={substatDef[key_ as SubstatKeys].table as any as number[]}
      />
    </Box>
  );
};
