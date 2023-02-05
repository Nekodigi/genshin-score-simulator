import { blue, grey, indigo } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { themeCommon } from "./theme";

let black = "#EEEEEE";
let gray = "#BDBDBD";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    com: themeCommon,
    primary: indigo,
    secondary: blue,
    local: {
      bg: "#0A0E32",
      modal: "#1C2041",
      paper: "#3B3E5B",
      white: "#212121",
      black: black,
      gray: gray,
      nekodigi:
        " linear-gradient(156.05deg, #FF0000 -55.32%, #FFB199 111.96%);",
    },
    text: {
      primary: black,
      secondary: gray,
    },
  },
});
export { darkTheme };
