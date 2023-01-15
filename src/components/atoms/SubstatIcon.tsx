/** @jsxImportSource @emotion/react */

import { Box, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { substatDef } from "../../utils/consts/Substat";
import { fontTypes } from "../../utils/styles/fonts";
import { SubstatKeys } from "../../utils/types/Substat";
import { faAnemo } from "./faIcons";
import FontAwesomeSvgIcon from "./FontAwesomeSvgIcon";

type SubstatIconProps = {
  statKey: SubstatKeys;
  value?: number;
  size?: number;
};
export const SubstatIcon = (props: SubstatIconProps) => {
  const { statKey, value, size } = props;
  const theme = useTheme();
  const { t } = useTranslation("artifact");
  let text = t(`substatusAbbr.${statKey}`) as string;
  if (value !== undefined) {
    if (text.charAt(text.length - 1) === "%") {
      text = text.slice(0, -1);
      text += `+${value.toFixed(1)}%`;
    } else {
      text += `+${value.toFixed(0)}`;
    }
  }
  return (
    <Box display="flex" alignItems="center" gap={1} fontSize={size ? size : 14}>
      {substatDef[statKey].icon !== undefined ? (
        <FontAwesomeSvgIcon
          icon={substatDef[statKey].icon}
          sx={{ fontSize: "inherit" }}
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
