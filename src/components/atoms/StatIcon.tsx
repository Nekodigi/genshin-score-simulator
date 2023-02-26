/** @jsxImportSource @emotion/react */

import { Box, SxProps, Typography, useTheme } from "@mui/material";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { statDef, statKeyType } from "../../utils/consts/Stat";
import { fontTypes } from "../../utils/styles/fonts";
import FontAwesomeSvgIcon from "./FontAwesomeSvgIcon";

type StatIconProps = {
  statKey: statKeyType;
  sx?: SxProps;
  value?: number;
  size?: number;
  full?: boolean;
};

export const StatValue2Str = (
  t: TFunction,
  statKey: statKeyType,
  value?: number,
  full?: boolean
) => {
  let text = t(
    `artifact:${
      full === undefined ? "substatusAbbr" : "substatusFull"
    }.${statKey}`
  ) as string;
  if (value !== undefined && value !== null) {
    if (text.charAt(text.length - 1) === "%") {
      text = text.slice(0, -1);
      text += `+${value.toFixed(1)}%`;
    } else {
      text += `+${value.toFixed(0)}`;
    }
  }
  return text;
};

export const StatIcon = (props: StatIconProps) => {
  const { statKey, sx, value, size, full } = props;
  const theme = useTheme();
  const { t } = useTranslation("artifact");
  const text = StatValue2Str(t, statKey, value, full);

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={sx}
      fontSize={size ? size : 14}
    >
      {statDef[statKey].icon !== undefined ? (
        <FontAwesomeSvgIcon
          icon={statDef[statKey].icon}
          style={{ fontSize: "inherit" }}
        />
      ) : null}
      <Typography
        css={[fontTypes(theme).disc, { color: "inherit", fontSize: "inherit" }]}
      >
        {text}
      </Typography>
    </Box>
  );
};
