import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@mui/material";
import IconButton_ from "@mui/material/IconButton";
import chroma from "chroma-js";

type IconButtonProps = {
  icon: IconDefinition;
  color: string;
  onClick?: () => void;
};
export const IconButton = ({ icon, color, onClick }: IconButtonProps) => {
  const theme = useTheme();

  return (
    <IconButton_
      sx={{
        width: 32,
        height: 32,
        borderRadius: 1,
        background: color,
        ":hover": { background: chroma(color).darken().hex() },
        position: "absolute",
        top: 16,
        right: 16,
      }}
      onClick={onClick}
    >
      <FontAwesomeIcon color={theme.palette.com.white} icon={icon} />
    </IconButton_>
  );
};
