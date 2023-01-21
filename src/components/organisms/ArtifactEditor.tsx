/** @jsxImportSource @emotion/react */

import {
  Alert,
  Box,
  Modal,
  Typography,
  Button,
  SxProps,
  useTheme,
  CircularProgress,
} from "@mui/material";
import {
  AddRounded,
  DeleteForeverRounded,
  DoDisturbRounded,
  SaveRounded,
} from "@mui/icons-material";
import { NumberInput } from "../atoms/NumberInput";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { SubstatInput } from "../molecules/SubstatInput";
import { Artifact } from "../../utils/class/Artifact";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import Tesseract from "tesseract.js";
import { fontTypes } from "../../utils/styles/fonts";
import { NumberOption } from "../molecules/NumberOption";
import { IconTextButton } from "../molecules/IconTextButton";
import {
  faAdd,
  faBan,
  faCamera,
  faClose,
  faFloppyDisk,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "../molecules/IconButton";
import { StyledModal } from "../molecules/StyledModal";
import { AutoFillButton } from "../molecules/AutoFillButton";
import { Suspense } from "react";

const style: SxProps = {
  position: "absolute" as "absolute",
  outline: "none",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 390,
  width: "100vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export const ArtifactEditor = () => {
  const { artifacts, setArtifacts } = useContext(ArtifactsContext);
  const theme = useTheme();
  const { t } = useTranslation(["editor", "common"]);
  let { editor } = useContext(EditorContext);
  const [level, setLevel] = useState(0);

  const scores = useMemo(
    () => new Artifact(editor.artifact).getScores(),
    [editor.artifact]
  );

  const error = useMemo(() => {
    let allSubstate = true;
    editor.artifact.substats.forEach((ss) => {
      if (ss.key === "ERR") allSubstate = false;
    });
    //if (!allSubstate) return "Accurate score prediction requires 4 sub-stats.";
    //else return undefined;
    return undefined;
  }, [editor.artifact]);

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

      {error ? (
        <Alert
          variant="filled"
          severity="warning"
          css={[fontTypes(theme).disc, { color: theme.palette.com.white }]}
          sx={{ px: 1 }}
        >
          {error}
        </Alert>
      ) : undefined}

      {/* <Typography css={fontTypes(theme).subtitle}>Auto fill</Typography> */}
      <Typography css={fontTypes(theme).subtitle}>Auto Fill</Typography>
      <Suspense fallback={<CircularProgress />}>
        <AutoFillButton />
      </Suspense>
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
