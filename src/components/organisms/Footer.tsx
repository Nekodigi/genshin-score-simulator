/** @jsxImportSource @emotion/react */

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  useTheme,
  Typography,
  Link,
} from "@mui/material";
import { Nekodigi } from "../molecules/Nekodigi";
import { FaGithub, FaYoutube, FaGooglePlay } from "react-icons/fa";
import { MdArticle } from "react-icons/md";

import { Button } from "@mui/material";
import { css, jsx } from "@emotion/react";

import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline/CssBaseline";
import { fontFamilies, fontSizes } from "../../utils/styles/fonts";
import { useTranslation } from "react-i18next";

export const Footer = () => {
  const theme = useTheme();
  const { t } = useTranslation("home");
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <AppBar
        position="relative"
        sx={{
          bgcolor: theme.palette.local.white,
        }}
        elevation={0}
      >
        <Container>
          <Toolbar
            sx={{
              py: 1.75,
              px: 2,
              color: theme.palette.text.primary,

              borderTop: `1px solid`,
              borderColor: theme.palette.local.paper,
            }}
          >
            <Nekodigi useLogo={true} />
            <Box flexGrow={1}></Box>
            <Box
              position="absolute"
              left={0}
              right={0}
              mx="auto"
              width="fit-content"
            >
              <Link href="/terms/privacy" underline="none">
                <Typography
                  css={[fontFamilies.Jp, fontSizes.px12]}
                  color="text.secondary"
                  fontWeight={400}
                >
                  Privacy Policy
                </Typography>
              </Link>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "flex" } }} gap={2}>
              <IconButton href="https://github.com/Nekodigi">
                <FaGithub color="text.primary" />
              </IconButton>
              <IconButton href={t("socialMedia.links.youtube")}>
                <FaYoutube color="text.primary" />
              </IconButton>
              <IconButton href={t("socialMedia.links.blog")}>
                <MdArticle color="text.primary" />
              </IconButton>
              <IconButton href="https://play.google.com/store/apps/dev?id=8989861170574890555">
                <FaGooglePlay color="text.primary" />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

type TextButtonProps = {
  label: string;
};

export const TextButton = (props: TextButtonProps) => {
  const theme = useTheme();
  const { label } = props;

  return (
    <Button
      css={[fontFamilies.Jp, fontSizes.px16]} //, fontFamily: "Noto Sans JP"
      sx={{
        color: theme.palette.com.white,
        textTransform: "none",
        fontWeight: 400,
        fontSize: 16,
      }}
    >
      {label}
    </Button>
  );
};
