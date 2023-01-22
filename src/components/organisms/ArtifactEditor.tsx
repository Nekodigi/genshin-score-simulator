/** @jsxImportSource @emotion/react */

import {
  Alert,
  Box,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import React, { useMemo, useContext } from "react";
import { SubstatInput } from "../molecules/SubstatInput";
import { Artifact } from "../../utils/class/Artifact";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { fontTypes } from "../../utils/styles/fonts";
import { NumberOption } from "../molecules/NumberOption";
import { IconTextButton } from "../molecules/IconTextButton";
import {
  faAdd,
  faBan,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { StyledModal } from "../molecules/StyledModal";
//import { AutoFillButton } from "../molecules/AutoFillButton";
import { Suspense, lazy } from "react";
const AutoFillButton = lazy(() => import("../molecules/AutoFillButton"));

const ArtifactEditor = () => {
  const { setArtifacts } = useContext(ArtifactsContext);
  const theme = useTheme();
  const { t } = useTranslation(["editor", "common"]);
  let { editor, weight } = useContext(EditorContext);

  const scores = useMemo(
    () => new Artifact(weight, editor.artifact).getScores(),
    [editor.artifact, weight]
  );

  const complete = () => {
    if (editor.target !== null) {
      setArtifacts({
        type: "UPDATE",
        artifact: editor.artifact,
        id: editor.target,
      });
    } else {
      setArtifacts({ type: "ADD", artifact: editor.artifact });
    }
    editor.change(false);
  };

  return (
    <StyledModal open={editor.open} onClose={() => editor.change(false)}>
      <Typography css={fontTypes(theme).title}>{t("editor.title")}</Typography>
      <Typography css={fontTypes(theme).subtitle}>
        {t("editor.level")}
      </Typography>
      <NumberOption
        value={editor.artifact.level}
        setValue={(value) =>
          editor.setArtifact((prev) => ({
            ...prev,
            level: value,
          }))
        }
        options={[0, 4, 8, 12, 16, 20]}
        displayRaw
      />
      <Typography css={fontTypes(theme).subtitle}>
        {t("editor.substatus")}
      </Typography>
      {/* TODO: useArtifact value */}

      <Box>
        {[0, 1, 2, 3].map((index) => {
          return (
            <SubstatInput
              value={editor.artifact.substats[index].value}
              setValue={(value) =>
                editor.setArtifact((prev) => {
                  prev.substats[index].value = value;
                  return { ...prev };
                })
              }
              key={index}
              key_={editor.artifact.substats[index].key}
              setKey={(key) =>
                editor.setArtifact((prev) => {
                  prev.substats[index].key = key;
                  return { ...prev };
                })
              }
            />
          );
        })}
      </Box>

      {/* <Typography css={fontTypes(theme).subtitle}>Auto fill</Typography> */}
      <Typography css={fontTypes(theme).subtitle}>
        {t("editor.autoFill")}
      </Typography>
      <Suspense fallback={<CircularProgress />}>
        <AutoFillButton />
      </Suspense>

      {editor.info ? (
        <Alert
          variant="filled"
          severity={editor.info.sevarity}
          css={[fontTypes(theme).disc, { color: theme.palette.com.white }]}
          sx={{ px: 1 }}
        >
          {editor.info.text}
        </Alert>
      ) : undefined}

      <Typography css={fontTypes(theme).subtitle}>
        {t("editor.estimScore")}
      </Typography>
      <Box display="flex" alignItems="center" gap={1}>
        <Typography css={[fontTypes(theme).title]}>
          {`${scores.minScore.toFixed(1)} ~`}
        </Typography>
        <Box
          display="flex"
          sx={{
            background:
              theme.palette.com.scale[
                Math.min(10 + Math.floor(scores.avgScore / 10) * 10, 60)
              ],
            px: 1,
            py: 0.5,
            borderRadius: 1,
          }}
          alignSelf="flex-start"
        >
          <Typography
            css={[fontTypes(theme).title, { color: theme.palette.com.black }]}
          >
            {scores.avgScore.toFixed(1)}
          </Typography>
        </Box>
        <Typography css={[fontTypes(theme).title]}>
          {`~ ${scores.maxScore.toFixed(1)}`}
        </Typography>
      </Box>

      <Box
        bottom={16}
        right={16}
        display="flex"
        justifyContent="flex-end"
        gap={1}
      >
        <IconTextButton
          text={
            editor.target === null
              ? t("common:action.cancel")!
              : t("common:action.delete")!
          }
          icon={editor.target === null ? faBan : faTrash}
          color={theme.palette.error.dark}
          onClick={() => {
            if (editor.target === null) editor.change(false);
            else {
              setArtifacts({ type: "DELETE", id: editor.target });
              editor.change(false);
            }
          }}
        />
        <IconTextButton
          text={
            editor.target === null
              ? t("common:action.add")!
              : t("common:action.save")!
          }
          icon={editor.target === null ? faAdd : faFloppyDisk}
          color={theme.palette.success.dark}
          onClick={() => complete()}
        />
      </Box>
    </StyledModal>
  );
};
export default ArtifactEditor;
