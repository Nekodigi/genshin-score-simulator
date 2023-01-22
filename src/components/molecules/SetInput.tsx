/** @jsxImportSource @emotion/react */

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { NumberOption } from "./NumberOption";
import { fontTypes } from "../../utils/styles/fonts";
import { substatKey, substatKeyType } from "../../utils/consts/Substat";
import { statDef, statKeyType } from "../../utils/consts/Stat";
import { StatIcon } from "../atoms/StatIcon";
import { useTranslation } from "react-i18next";
import { CSSProperties } from "react";
import { setKey, setKeyType } from "../../utils/consts/Artifact";
import artifacts from "../../utils/consts/genshindb-partial.json";
import { SetIcon } from "../atoms/SetIcon";

type SetInputProps = {
  setSet: (value: setKeyType) => void;
  set: setKeyType;
  sx?: SxProps;
};

export const SetInput = (props: SetInputProps) => {
  const { setSet, set, sx } = props;
  const theme = useTheme();
  const { t } = useTranslation("artifact");
  const r = Math.random();
  return (
    <FormControl variant="standard" sx={sx}>
      <InputLabel
        id={`stat-input${r}-label`}
        css={fontTypes(theme).disc}
        sx={{ pl: 1.5, pt: 0.5, zIndex: 1, pointerEvents: "none" }}
      >
        {t("set")}
      </InputLabel>
      <Select
        labelId={`stat-input${r}-label`}
        id={`stat-input${r}`}
        value={set}
        variant="standard"
        size="small"
        label={t("set")}
        css={[fontTypes(theme).disc, { color: theme.palette.com.white }]}
        sx={{
          bgcolor:
            set === ""
              ? theme.palette.com.main[500]
              : theme.palette.com.main.L500,
          pl: 1.5,
          pt: 0.5,
          borderRadius: 0.5,
          color: theme.palette.com.white,
          height: 32,
        }}
        onChange={(e) =>
          e.target.value !== undefined && setSet(e.target.value as setKeyType)
        }
        disableUnderline
      >
        {setKey.map((key, i) => {
          return (
            <MenuItem
              key={i}
              value={key}
              css={fontTypes(theme).disc}
              sx={{ minHeight: 0, display: "flex", alignItems: "center" }}
            >
              {
                // <Typography>{artifacts[key].name.ja}</Typography>
                <SetIcon setKey={key} />
              }
              {/* {substatDef[key].name} */}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
