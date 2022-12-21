import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/system";
import React, { useEffect, useReducer, useState } from "react";
import { AddArtifactCard } from "./components/organisms/AddArtifactCard";
import ArtifactCard from "./components/organisms/ArtifactCard";
import { ArtifactEditor } from "./components/organisms/ArtifactEditor";
import Header from "./components/organisms/Header";
import "./App.css";
import { darkTheme } from "./themes/dark";
import { EditorContext } from "./utils/contexts/EditorContext";
import { ArtifactsContext } from "./utils/contexts/ArtifactsContext";
import { ArtifactValue } from "./utils/types/Artifact";
import { ArtifactsReducer } from "./utils/reducers/Artifact";
import { ArtifactList } from "./components/organisms/ArtifactList";

function App() {
  const [open, setOpen] = useState(true);
  const [target, setTarget] = useState<number | null>(null);
  const editorValue = { open, setOpen, target, setTarget };
  const [artifacts, setArtifacts] = useReducer(ArtifactsReducer, []);
  const artifactsValue = { artifacts, setArtifacts };

  useEffect(() => {
    //sample value
    setArtifacts({
      type: "ADD",
      artifact: {
        level: 12,
        substats: [
          { key: "HP ", value: 12 },
          { key: "AT%", value: 4 },
          { key: "CRR", value: 4 },
          { key: "CRD", value: 3 },
        ],
      },
    });
    setArtifacts({
      type: "ADD",
      artifact: {
        level: 4,
        substats: [
          { key: "HP ", value: 12 },
          { key: "AT%", value: 43 },
          { key: "CRR", value: 44 },
          { key: "CRD", value: 32 },
        ],
      },
    });
  }, []);

  return (
    <div className="App">
      {/* <ThemeProvider theme={darkTheme}> */}
      <ArtifactsContext.Provider value={artifactsValue}>
        <EditorContext.Provider value={editorValue}>
          <CssBaseline />
          <Header />
          <ArtifactEditor />
          <ArtifactList />
        </EditorContext.Provider>
      </ArtifactsContext.Provider>
      {/* </ThemeProvider> */}
    </div>
  );
}

export default App;
