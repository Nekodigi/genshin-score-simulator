import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "white",
      secondary: grey[500],
    },
  },
});
export { darkTheme };
