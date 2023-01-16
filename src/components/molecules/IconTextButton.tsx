/** @jsxImportSource @emotion/react */

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Typography, useTheme } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import { fontSizes, fontTypes } from "../../utils/styles/fonts";
import chroma from "chroma-js";
import { CSSProperties } from "react";

type IconTextButtonProps = {
  text?: string;
  icon: IconProp;
  color: string;
  style?: CSSProperties;
  onClick?: () => void;
  children?: React.ReactNode;
};
export const IconTextButton = (props: IconTextButtonProps) => {
  const { text, icon, color, style, onClick, children } = props;
  const theme = useTheme();

  return (
    <Button
      component="label"
      style={style}
      sx={{
        minWidth: 16,

        background: color,
        justifyContent: "center",
        px: 1.5,
        height: 32,
        borderRadius: 1,
        textTransform: "none",
        ":hover": { background: chroma(color).darken().hex() },
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
      {children}
      {text !== undefined ? (
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
      ) : null}
    </Button>
  );
};
