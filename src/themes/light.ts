import { grey } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: "#000",
      secondary: grey[500],
    },
  },
});
export { lightTheme };
