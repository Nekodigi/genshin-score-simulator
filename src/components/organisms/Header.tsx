/** @jsxImportSource @emotion/react */

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppBar, Container, IconButton, useTheme } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { useContext, useState } from "react";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { fontTypes } from "../../utils/styles/fonts";
import { ArtifactSim } from "../atoms/ArtifactSim";

const Header = () => {
  const { setArtifacts } = useContext(ArtifactsContext);
  const { drawer } = useContext(EditorContext);

  const theme = useTheme();

  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "true"
  );

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
        <script async src="opencv.js" type="text/javascript"></script>
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
            <IconButton aria-label="menu" onClick={() => drawer.setOpen(true)}>
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
