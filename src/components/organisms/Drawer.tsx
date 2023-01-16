/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import {
  Box,
  Button,
  Drawer,
  FormControl,
  MenuItem,
  Select,
  Switch,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useState } from "react";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { fontSizes, fontTypes } from "../../utils/styles/fonts";
import { ArtifactSim } from "../atoms/ArtifactSim";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faFileImport } from "@fortawesome/free-solid-svg-icons";
import Assets from "../../assets/Assets";
import { display } from "@mui/system";
import { text } from "stream/consumers";
import { ThemeContext } from "../../utils/contexts/ThemeContext";
import { darkTheme } from "../../themes/dark";
import { lightTheme } from "../../themes/light";
import { faFlower } from "../atoms/faIcons";
import FontAwesomeSvgIcon from "../atoms/FontAwesomeSvgIcon";
import { useTranslation } from "react-i18next";

export const PageDrawer = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { setTheme } = useContext(ThemeContext);

  const { drawer, importer } = useContext(EditorContext);
  const [language, setLanguage] = useState(i18n.language.substring(0, 2));
  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "true"
  );

  return (
    <Drawer
      open={drawer.open}
      onClose={() => drawer.setOpen(false)}
      anchor="right"
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          background: theme.palette.local.modal,
        }}
      >
        <Box>
          <Box m={2} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ArtifactSim />
          </Box>
          <TextIconButton
            text={t("sidebar.artifact")}
            icon={<FontAwesomeSvgIcon icon={faFlower} sx={{ fontSize: 24 }} />}
          />
          {/* <TextIconButton
            text={t("sidebar.guide")}
            icon={<FontAwesomeIcon icon={faBook} fontSize={24} />}
          /> */}
          <TextIconButton
            text={t("sidebar.import")}
            icon={<FontAwesomeIcon icon={faFileImport} fontSize={24} />}
            onClick={() => importer.setOpen(true)}
          />
        </Box>
        <Box>
          <Box css={[itemBox(theme), { justifyContent: "space-between" }]}>
            <Typography css={baseFont(theme)}>
              {t("sidebar.darkMode")}
            </Typography>
            <Switch
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked);
                localStorage.setItem("theme", String(e.target.checked));
                e.target.checked ? setTheme(darkTheme) : setTheme(lightTheme);
              }}
            />
          </Box>
          <Box
            css={[itemBox(theme), { justifyContent: "space-between" }]}
            mb={4}
          >
            <Typography css={[baseFont(theme)]}>
              {t("sidebar.proMode")}
            </Typography>
            <Switch />
          </Box>
          <Box
            css={[itemBox(theme), { justifyContent: "space-between" }]}
            mb={4}
          >
            <Typography css={baseFont(theme)}>
              {t("sidebar.language")}
            </Typography>
            <FormControl variant="standard">
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Language"
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  i18n.changeLanguage(e.target.value);
                }}
                css={baseFont(theme)}
                sx={{ width: 96 }}
              >
                <MenuItem value="en">English</MenuItem>
                <MenuItem value="ja">日本語</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};

const baseFont = (theme) =>
  css([fontTypes(theme).subtitle, { fontWeight: 500 }]);

const iconBox = css({
  width: 32,
  height: 32,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const itemBox = (theme: Theme) =>
  css([
    {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      textTransform: "none",
      padding: 16,
      paddingTop: 8,
      paddingBottom: 8,
      gap: 12,
      width: "100%",
    },
    fontTypes(theme).subtitle,
  ]);

type TextIconButtonProps = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
};
const TextIconButton = (props: TextIconButtonProps) => {
  const { icon, text, onClick } = props;
  const theme = useTheme();

  return (
    <Button css={itemBox(theme)} onClick={onClick}>
      <Box css={iconBox}>{icon}</Box>
      <Typography css={baseFont(theme)}>{text}</Typography>
    </Button>
  );
};
