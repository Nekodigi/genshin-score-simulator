/** @jsxImportSource @emotion/react */

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  useTheme,
} from "@mui/material";
import { NumberOption } from "./NumberOption";
import { fontTypes } from "../../utils/styles/fonts";
import { substatKey, substatKeyType } from "../../utils/consts/Substat";
import { statDef, statKeyType } from "../../utils/consts/Stat";
import { StatIcon } from "../atoms/StatIcon";
import { useTranslation } from "react-i18next";
import { CSSProperties } from "react";

type SubstatInputProps = {
  setKey: (value: substatKeyType) => void;
  key_: substatKeyType;
  setValue: (value: number) => void;
  value: number;
};
type StatKeyInputProps = {
  setKey: (value: statKeyType) => void;
  label?: string;
  keys?: string[];
  key_: statKeyType;
  full?: boolean;
  sx?: CSSProperties;
};

export const StatKeyInput = (props: StatKeyInputProps) => {
  const { setKey, key_, keys, label, sx, full } = props;
  const theme = useTheme();
  const { t } = useTranslation("artifact");
  const r = Math.random();
  return (
    <FormControl variant="standard" sx={sx}>
      <InputLabel
        id={`stat-input${r}-label`}
        css={[fontTypes(theme).disc, { color: theme.palette.com.white }]}
        sx={{
          pl: 1,
          pt: 0.5,
          zIndex: 1,
          pointerEvents: "none",
        }}
        disableAnimation
      >
        {label ? label : t("substat")}
      </InputLabel>
      <Select
        labelId={`stat-input${r}-label`}
        id={`stat-input${r}`}
        value={key_}
        variant="standard"
        size="small"
        label={label ? label : t("substat")}
        css={[fontTypes(theme).disc, { color: theme.palette.com.white }]}
        sx={{
          bgcolor:
            key_ === ""
              ? theme.palette.com.main[500]
              : theme.palette.com.main.L500,
          pl: 1,
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
        {(keys ? keys : substatKey).map((key, i) => {
          return (
            <MenuItem
              key={i}
              value={key}
              css={fontTypes(theme).disc}
              sx={{ minHeight: 0, display: "flex", alignItems: "center" }}
            >
              <StatIcon statKey={key} full={full} />
              {/* {substatDef[key].name} */}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export const SubstatInput = (props: SubstatInputProps) => {
  const { setKey, key_, setValue, value } = props;
  const theme = useTheme();

  return (
    <Box display="flex" sx={{ mb: 1 }} alignItems="flex-end">
      <StatKeyInput
        setKey={setKey as (value: statKeyType) => void}
        key_={key_}
        sx={{ width: 128 }}
      />
      <NumberOption
        value={value}
        setValue={setValue}
        options={statDef[key_].table as any as number[]}
      />
    </Box>
  );
};
