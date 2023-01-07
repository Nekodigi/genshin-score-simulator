import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { themeCommon } from "./theme";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    com: themeCommon,
    local: {
      black: "#000000",
      white: "#FFFFFF",
      gray: "#8C8C8C",
      whiteDark: "#D1D1D1",
    },
    text: {
      primary: "#000",
      secondary: "#8C8C8C",
    },
  },
});
export { lightTheme };
