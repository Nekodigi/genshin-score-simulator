import * as PaletteColorOptions from "@mui/material/styles/createPalette";
import { createTheme } from "@mui/material/styles";

//You can use themeContext if theme is not applied
// PaletteOptions を拡張して、カラーキーワードを追加
declare module "@mui/material/styles" {
  interface PaletteOptions {
    com: {
      black: string;
      blackLight: string;
      white: string;
      dawn: string;
    };
    local: {
      black: string;
      white: string;
      gray: string;
      whiteDark: string;
    };
  }

  interface Palette extends PaletteOptions {}
}

export const themeCommon = {
  black: "#000000",
  blackLight: "#242424",
  white: "#FFFFFF",
  dawn: "linear-gradient(160.54deg, rgba(204, 32, 142, 0.4) 9.46%, rgba(103, 19, 210, 0.4) 91.43%), #434343;",
};
