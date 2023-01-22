/** @jsxImportSource @emotion/react */

import { Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { fontFamilies, fontSizes } from "../../utils/styles/fonts";

export const ArtifactSim = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Typography
      css={[fontFamilies.Jp, fontSizes.px24]}
      component="div"
      flexGrow={1}
      sx={{
        fontWeight: 700,
        background: theme.palette.local.nekodigi,
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        {t("header.title")}
      </Link>
    </Typography>
  );
};
