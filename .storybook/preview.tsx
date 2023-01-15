export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import { darkTheme } from "../src/themes/dark";
/* snipped for brevity */

export const withMuiTheme = (Story) => (
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

export const decorators = [withMuiTheme];
