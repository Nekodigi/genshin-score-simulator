import { AppBar, Switch } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { darkTheme } from "../../themes/dark";
import { lightTheme } from "../../themes/light";
import { ThemeContext } from "../../utils/contexts/ThemeContext";

const Header = () => {
  const { setTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "true"
  );
  console.log(useContext(ThemeContext));

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" flexGrow={1}>
          Artifact Score Simulator
        </Typography>
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
