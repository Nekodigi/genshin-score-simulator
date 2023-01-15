import CssBaseline from "@mui/material/CssBaseline";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { ArtifactEditor } from "./components/organisms/ArtifactEditor";
import Header from "./components/organisms/Header";

import { darkTheme } from "./themes/dark";
import { EditorContext } from "./utils/contexts/EditorContext";
import { ArtifactsContext } from "./utils/contexts/ArtifactsContext";
import { ArtifactValue } from "./utils/types/Artifact";
import { ArtifactsReducer } from "./utils/reducers/Artifact";
import { ArtifactList } from "./components/organisms/ArtifactList";
import { Artifact } from "./utils/class/Artifact";
import { Box, Container, ThemeProvider, useTheme } from "@mui/material";
import { lightTheme } from "./themes/light";
import { ThemeContext } from "./utils/contexts/ThemeContext";

import { Footer } from "./components/organisms/Footer";
import { PageDrawer } from "./components/organisms/Drawer";
import {
  BrowserRouter,
  HashRouter,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Editor } from "./pages/Editor";
import { SubstatValue, SubstatWeight } from "./utils/types/Substat";
import { Filter } from "./utils/types/Filter";
import { Sort } from "./utils/types/Sort";

function App() {
  if (localStorage.getItem("theme") === null)
    localStorage.setItem("theme", "true");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "false" ? lightTheme : darkTheme
  );
  const themeValue = { theme, setTheme };

  const [open, setOpen] = useState(true);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [target, setTarget] = useState<number | null>(null);
  const [filter, setFilter] = useState({
    level: [0, 20],
    score: [0, 61],
  } as Filter);
  const [sort, setSort] = useState({
    key: "avgScore",
    desc: true,
  } as Sort);
  const [weight, setWeight] = useState({
    hp: 0,
    atk: 0,
    def: 0,
    hp_: 0,
    atk_: 1,
    def_: 0,
    eleMas: 0,
    enerRech_: 0,
    critRate_: 2,
    critDMG_: 1,
  } as SubstatWeight);
  const [artifact, setArtifact] = useState<ArtifactValue>(
    new Artifact().toValue()
  );
  const change = (open: boolean, id?: number) => {
    if (id !== undefined) {
      setTarget(id);
      console.log(id);
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
    openDrawer,
    setOpenDrawer,
    target,
    setTarget,
    artifact,
    setArtifact,
    change,
    weight,
    setWeight,
    filter,
    setFilter,
    sort,
    setSort,
  };

  const testArtifact: ArtifactValue = {
    level: 12,
    substats: [
      { key: "hp", value: 250 },
      { key: "atk_", value: 5.8 },
      { key: "critDMG_", value: 7.2 },
      { key: "critRate_", value: 3.2 },
    ],
  };
  const [artifacts, setArtifacts] = useReducer(ArtifactsReducer, []); //always use reducer to add! otherwise id go wrong!
  const artifactsValue = { artifacts, setArtifacts };

  useEffect(() => {
    setArtifacts({ type: "ADD", artifact: testArtifact });
  }, []);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ThemeProvider theme={theme}>
        <ArtifactsContext.Provider value={artifactsValue}>
          <EditorContext.Provider value={editorValue}>
            <Box
              className="App"
              sx={{
                background: theme.palette.local.bg,
                whiteSpace: "pre-wrap",
              }}
            >
              <CssBaseline />
              <Header />
              <PageDrawer />
              <Content />
              <Footer />
            </Box>
          </EditorContext.Provider>
        </ArtifactsContext.Provider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;

const Content = () => {
  return (
    <Container sx={{ minHeight: "100vh", p: 2 }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor />} />
          <Route
            path="/legacy"
            element={
              <div>
                <ArtifactEditor />
                <ArtifactList />
              </div>
            }
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};
