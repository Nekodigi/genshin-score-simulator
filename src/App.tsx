import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import React from "react";
import ArtifactCard from "./compoents/organisms/ArtifactCard";
import Header from "./compoents/organisms/Header";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <Box display="inline-block">
          <ArtifactCard
            place={1}
            score={{ minScore: 1, avgScore: 2, maxScore: 3 }}
            artifact={{
              level: 4,
              substats: [
                { key: "HP ", value: 12 },
                { key: "ATK", value: 43 },
                { key: "CRR", value: 44 },
                { key: "EnR", value: 32 },
              ],
            }}
          />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
