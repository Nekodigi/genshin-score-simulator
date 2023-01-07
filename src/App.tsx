import CssBaseline from "@mui/material/CssBaseline";
import React, { useEffect, useReducer, useState } from "react";
import { ArtifactEditor } from "./components/organisms/ArtifactEditor";
import Header from "./components/organisms/Header";
import "./App.css";
import { darkTheme } from "./themes/dark";
import { EditorContext } from "./utils/contexts/EditorContext";
import { ArtifactsContext } from "./utils/contexts/ArtifactsContext";
import { ArtifactValue } from "./utils/types/Artifact";
import { ArtifactsReducer } from "./utils/reducers/Artifact";
import { ArtifactList } from "./components/organisms/ArtifactList";
import { Artifact } from "./utils/class/Artifact";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "./themes/light";
import { ThemeContext } from "./utils/contexts/ThemeContext";

import { Footer } from "./components/organisms/Footer";

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "true" ? darkTheme : lightTheme
  );
  const themeValue = { theme, setTheme };

  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<number | null>(null);
  const [artifact, setArtifact] = useState<ArtifactValue>(
    new Artifact().toValue()
  );
  const change = (open: boolean, id?: number) => {
    if (id !== undefined) {
      setTarget(id);
      setArtifact(artifacts[id]);
      setOpen(open);
    } else {
      setTarget(null);
      setArtifact(new Artifact().toValue());
      setOpen(open);
    }
  };
  const editorValue = {
    open,
    setOpen,
    target,
    setTarget,
    artifact,
    setArtifact,
    change,
  };
  const [artifacts, setArtifacts] = useReducer(ArtifactsReducer, []);
  const artifactsValue = { artifacts, setArtifacts };

  return (
    <div className="App">
      <ThemeContext.Provider value={themeValue}>
        <ThemeProvider theme={theme}>
          <ArtifactsContext.Provider value={artifactsValue}>
            <EditorContext.Provider value={editorValue}>
              <CssBaseline />
              <Header />
              <ArtifactEditor />
              <ArtifactList />
              <Footer />
            </EditorContext.Provider>
          </ArtifactsContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
