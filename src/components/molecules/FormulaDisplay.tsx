/** @jsxImportSource @emotion/react */

import { Box, Typography, useTheme } from "@mui/material";
import { fontTypes } from "../../utils/styles/fonts";
import { css } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { useContext, useMemo } from "react";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { substatKey } from "../../utils/consts/Substat";

export const FormulaDisplay = () => {
  const theme = useTheme();
  const { t } = useTranslation(["artifact", "editor"]);
  const { weight } = useContext(EditorContext);

  const scoreFormula = useMemo(() => {
    let firstTime = true;
    return substatKey.map((key) => {
      let w = weight[key];
      if (w !== undefined && w !== 0) {
        let headStr = " + ";
        if (firstTime) {
          headStr = "";
          firstTime = false;
        }
        if (w !== 1) headStr += `${w}×`;
        return headStr + t(`substatusAbbr.${key}`);
      }
    });
  }, [weight, t]);

  return (
    <Box
      display="flex"
      alignItems="center"
      px={1}
      py={0.75}
      sx={{ background: theme.palette.local.paper }}
      gap={1}
      borderRadius={1}
    >
      <Typography css={fontTypes(theme).disc}>
        {`${t("editor:artifact.score")} = `}
        {scoreFormula}
      </Typography>
    </Box>
  );
};
