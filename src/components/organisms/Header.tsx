import { FileUploadRounded } from "@mui/icons-material";
import { AppBar, IconButton, Switch, Tooltip } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { darkTheme } from "../../themes/dark";
import { lightTheme } from "../../themes/light";
import { Artifact } from "../../utils/class/Artifact";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { ThemeContext } from "../../utils/contexts/ThemeContext";
import { ArtifactValue } from "../../utils/types/Artifact";

const Header = () => {
  const { setTheme } = useContext(ThemeContext);
  const { setArtifacts } = useContext(ArtifactsContext);
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
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" flexGrow={1}>
          Artifact Score Simulator
        </Typography>
        <Tooltip title="Upload GOOD format json. Used in Genshin Optimizer.">
          <IconButton aria-label="attach file" component="label">
            <FileUploadRounded />
            <input hidden onChange={addFile} type="file" accept=".json" />
          </IconButton>
        </Tooltip>
        <Switch
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
            localStorage.setItem("theme", String(e.target.checked));
            e.target.checked ? setTheme(darkTheme) : setTheme(lightTheme);
          }}
        />
      </Toolbar>
    </AppBar>
  );
};
export default Header;
