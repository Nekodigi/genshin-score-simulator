/** @jsxImportSource @emotion/react */

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FileUploadRounded } from "@mui/icons-material";
import {
  AppBar,
  Container,
  IconButton,
  Switch,
  Tooltip,
  useTheme,
} from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { darkTheme } from "../../themes/dark";
import { lightTheme } from "../../themes/light";
import { Artifact } from "../../utils/class/Artifact";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { ThemeContext } from "../../utils/contexts/ThemeContext";
import { fontFamilies, fontSizes, fontTypes } from "../../utils/styles/fonts";
import { ArtifactValue } from "../../utils/types/Artifact";
import { ArtifactSim } from "../atoms/ArtifactSim";

const Header = () => {
  const { setArtifacts } = useContext(ArtifactsContext);
  const { setOpenDrawer } = useContext(EditorContext);

  const theme = useTheme();

  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "true"
  );
  console.log(useContext(ThemeContext));

  const addFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    let obj = JSON.parse(await e.target.files[0].text()) as any;
    console.log(obj);

    let artifact = obj.artifacts[1] as ArtifactValue;
    console.log(new Artifact(artifact).score());
    obj.artifacts.map((artifact: ArtifactValue) => {
      artifact.substats = artifact.substats.map((substat) => {
        return {
          key: substat.key === "" ? "ERR" : substat.key,
          value: substat.value,
        };
      });
      if (artifact.substats.length === 3)
        artifact.substats.push({ key: "ERR", value: 0 });
      setArtifacts({
        type: "ADD",
        artifact,
      });
    });
  };

  return (
    <div>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <AppBar sx={{ background: theme.palette.local.white }}>
        <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Toolbar>
            <ArtifactSim />
            {/* <Switch
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            localStorage.setItem("theme", String(e.target.checked));
            e.target.checked ? setTheme(darkTheme) : setTheme(lightTheme);
          }}
        /> */}
            {/* <Tooltip title="Upload GOOD format json. Used in Genshin Optimizer.">
          <IconButton aria-label="attach file" component="label">
            <FontAwesomeIcon icon={faBars} fontSize={24} />
            <input hidden onChange={addFile} type="file" accept=".json" />
          </IconButton>
        </Tooltip> */}
            <IconButton aria-label="menu" onClick={() => setOpenDrawer(true)}>
              <FontAwesomeIcon icon={faBars} css={fontTypes(theme).title} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar></Toolbar>
    </div>
  );
};
export default Header;
