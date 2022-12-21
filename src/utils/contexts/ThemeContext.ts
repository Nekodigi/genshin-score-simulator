import { Theme } from "@mui/material";
import { createContext } from "react";

type ThemeContextProps = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};
const ThemeContext = createContext({} as ThemeContextProps);

export { ThemeContext };
