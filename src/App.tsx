import CssBaseline from "@mui/material/CssBaseline";
import React, {
  useContext,
  useEffect,
  useReducer,
  useState,
  Suspense,
} from "react";
import Header from "./components/organisms/Header";

import { darkTheme } from "./themes/dark";
import {
  EditorContext,
  EditorContextProps,
  Info,
} from "./utils/contexts/EditorContext";
import { ArtifactsContext } from "./utils/contexts/ArtifactsContext";
import { ArtifactsReducer } from "./utils/reducers/Artifact";
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
import { SubstatWeight } from "./utils/types/Substat";
import { Filter } from "./utils/types/Filter";
import { Sort } from "./utils/types/Sort";
import { ArtifactImporter } from "./components/organisms/ArtifactImporter";
import { Test } from "./pages/Test";
import { ArtifactType } from "./utils/types/Artifact";

function App() {
  if (localStorage.getItem("theme") === null)
    localStorage.setItem("theme", "true");
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "false" ? lightTheme : darkTheme
  );
  const themeValue = { theme, setTheme };

  const [openEditor, setOpenEditor] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openImporter, setOpenImporter] = useState(false);
  const [target, setTarget] = useState<string | null>(null);
  const [info, setInfo] = useState<Info | undefined>();
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
  const [artifact, setArtifact] = useState<ArtifactType>(
    new Artifact().toValue()
  );
  const changeEditor = (open: boolean, id?: string) => {
    if (id !== undefined) {
      setTarget(id);
      setInfo(undefined);
      console.log(id);
      setArtifact(artifacts[id]);
      setOpenEditor(open);
    } else {
      setTarget(null);
      setInfo(undefined);
      setArtifact(new Artifact().toValue());
      setOpenEditor(open);
    }
  };
  let editorValue: EditorContextProps = {
    editor: {
      open: openEditor,
      setOpen: setOpenEditor,
      info,
      setInfo,
      target,
      setTarget,
      artifact,
      setArtifact,
      change: changeEditor,
    },
    drawer: {
      open: openDrawer,
      setOpen: setOpenDrawer,
    },
    importer: {
      open: openImporter,
      setOpen: setOpenImporter,
    },
    weight,
    setWeight,
    filter,
    setFilter,
    sort,
    setSort,
  };

  const testArtifact: ArtifactType = {
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
              <ArtifactImporter />
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
          <Route path="/test" element={<Test />} />
          <Route
            path="/editor"
            element={
              <Suspense>
                <Editor />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};
