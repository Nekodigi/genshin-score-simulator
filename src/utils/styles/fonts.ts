import { css } from "@emotion/react";
import { Theme } from "@mui/material";

export const fontFamilies = {
  Jp: css({ fontFamily: `"Roboto", "Noto Sans JP"` }),
};

export const fontSizes = {
  px32: css({
    fontSize: 32,
    lineHeight: "46px",
  }),
  px24: css({
    fontSize: 24,
    lineHeight: "29px",
  }),
  px18: css({
    fontSize: 18,
    lineHeight: "26px",
  }),
  px16: css({
    fontSize: 16,
    lineHeight: "23px",
  }),
  px14: css({
    fontSize: 14,
    lineHeight: "20px",
  }),
  px12: css({
    fontSize: 12,
    lineHeight: "17px",
  }),
};

export const fontTypes = (theme: Theme) => {
  return {
    title: css([
      fontSizes.px24,
      fontFamilies.Jp,
      { fontWeight: 700, color: theme.palette.text.primary },
    ]),
    subtitle: css([
      fontSizes.px18,
      fontFamilies.Jp,
      { fontWeight: 700, color: theme.palette.text.secondary },
    ]),
    body: css([
      fontSizes.px16,
      fontFamilies.Jp,
      { fontWeight: 500, color: theme.palette.text.secondary },
    ]),
    disc: css([
      fontSizes.px14,
      fontFamilies.Jp,
      { fontWeight: 500, color: theme.palette.text.primary },
    ]),
  };
};
