import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { AddArtifactCard } from "./compoents/organisms/AddArtifactCard";
import ArtifactCard from "./compoents/organisms/ArtifactCard";
import { ArtifactEditor } from "./compoents/organisms/ArtifactEditor";
import Header from "./compoents/organisms/Header";
import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: "white",
      secondary: grey[600],
    },
  },
});

function App() {
  const [open, setOpen] = useState(true);

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <ArtifactEditor open={open} setOpen={setOpen} />
        <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} m={1}>
          <ArtifactCard
            place={1}
            artifact={{
              level: 4,
              substats: [
                { key: "HP ", value: 12 },
                { key: "AT%", value: 43 },
                { key: "CRR", value: 44 },
                { key: "CRD", value: 32 },
              ],
            }}
          />
          <ArtifactCard
            place={1}
            artifact={{
              level: 4,
              substats: [
                { key: "HP ", value: 12 },
                { key: "AT%", value: 43 },
                { key: "CRR", value: 44 },
                { key: "CRD", value: 32 },
              ],
            }}
          />
          <ArtifactCard
            place={1}
            artifact={{
              level: 4,
              substats: [
                { key: "HP ", value: 12 },
                { key: "AT%", value: 43 },
                { key: "CRR", value: 44 },
                { key: "CRD", value: 32 },
              ],
            }}
          />
          <AddArtifactCard />
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default App;
