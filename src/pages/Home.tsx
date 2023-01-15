/** @jsxImportSource @emotion/react */

import { AddRounded, ArticleRounded } from "@mui/icons-material";
import { Box, IconButton, Theme, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FaGithub, FaGooglePlay, FaYoutube } from "react-icons/fa";
import { fontTypes } from "../utils/styles/fonts";
import { css } from "@emotion/react";
import { IconTextButton } from "../components/molecules/IconTextButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Suspense } from "react";

export const Home = () => {
  const { t } = useTranslation("home");
  const theme = useTheme();

  return (
    <Suspense>
      <Box display="flex" flexDirection="column" gap={1.5}>
        <Typography css={fontTypes(theme).title}>{t("intro.title")}</Typography>
        <Typography css={fontTypes(theme).body}>{t("intro.body")}</Typography>
        <Typography css={fontTypes(theme).title}>{t("usage.title")}</Typography>
        <Typography css={fontTypes(theme).body}>{t("usage.body")}</Typography>
        <Typography css={fontTypes(theme).title}>
          {t("toEditor.title")}
        </Typography>
        <Typography css={fontTypes(theme).body}>
          {t("toEditor.body")}
        </Typography>
        <Link to="/editor" style={{ textDecoration: "none" }}>
          <IconTextButton
            text={t("toEditor.openEditor")}
            color={theme.palette.success.dark}
            icon={faArrowUpRightFromSquare}
          />
        </Link>
        <Typography css={fontTypes(theme).title}>
          {t("socialMedia.title")}
        </Typography>
        <Typography css={fontTypes(theme).body}>
          {t("socialMedia.body")}
        </Typography>
        <Box display="flex" gap={1.5}>
          <IconButton href="https://github.com/Nekodigi">
            <FaGithub css={iconStyle(theme)} />
          </IconButton>
          <IconButton href={t("socialMedia.links.youtube")}>
            <FaYoutube css={iconStyle(theme)} />
          </IconButton>
          <IconButton href={t("socialMedia.links.blog")}>
            <ArticleRounded css={iconStyle(theme)} />
          </IconButton>
          <IconButton href="https://play.google.com/store/apps/dev?id=8989861170574890555">
            <FaGooglePlay css={iconStyle(theme)} />
          </IconButton>
        </Box>
      </Box>
    </Suspense>
  );
};

const iconStyle = (theme: Theme) =>
  css({
    fontSize: 24,
    color: theme.palette.text.primary,
  });
