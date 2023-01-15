/** @jsxImportSource @emotion/react */

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { fontSizes, fontTypes } from "../../utils/styles/fonts";
import chroma from "chroma-js";

type IconTextButtonProps = {
  text: string;
  icon: IconProp;
  color: string;
  onClick?: () => void;
};
export const IconTextButton = (props: IconTextButtonProps) => {
  const { text, icon, color, onClick } = props;
  const theme = useTheme();

  return (
    <Button
      sx={{
        bgcolor: color,
        justifyContent: "center",
        px: 1.5,
        height: 32,
        borderRadius: 1,
        textTransform: "none",
        ":hover": { bgcolor: chroma(color).darken().hex() },
      }}
      onClick={onClick}
      startIcon={
        <FontAwesomeIcon
          icon={icon}
          fontSize={16}
          style={{ color: theme.palette.com.white }}
        />
      }
    >
      <Typography
        css={[
          fontTypes(theme).disc,
          {
            color: theme.palette.com.white,
            textDecoration: "none",
            fontSize: 16,
          },
        ]}
      >
        {text}
      </Typography>
    </Button>
  );
};
