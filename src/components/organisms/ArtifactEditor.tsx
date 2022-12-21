import { Alert, Box, Modal, Typography, Button, SxProps } from "@mui/material";
import {
  AddRounded,
  DeleteForeverRounded,
  DoDisturbRounded,
  SaveRounded,
} from "@mui/icons-material";
import { NumberInput } from "../atoms/NumberInput";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { SubstatInput } from "../molecules/SubstatInput";
import { ArtifactValue } from "../../utils/types/Artifact";
import { Artifact } from "../../utils/class/Artifact";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import Tesseract from "tesseract.js";

const style: SxProps = {
  position: "absolute" as "absolute",
  outline: "none",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const ArtifactEditor = () => {
  const { artifacts, setArtifacts } = useContext(ArtifactsContext);
  let { open, target, artifact, setArtifact, change } =
    useContext(EditorContext);

  const scores = useMemo(() => new Artifact(artifact).getScores(), [artifact]);

  const error = useMemo(() => {
    let allSubstate = true;
    artifact.substats.forEach((ss) => {
      if (ss.key === "ERR") allSubstate = false;
    });
    if (!allSubstate)
      return "4 sub-stats are required to estimate 5 star artifact score.";
    else return undefined;
  }, [artifact]);

  const complete = () => {
    if (target !== null) {
      setArtifacts({ type: "UPDATE", artifact: artifact, id: target });
    } else {
      setArtifacts({ type: "ADD", artifact: artifact });
    }
    change(false);
  };

  useEffect(() => {
    const uploadImage = (files) => {
      console.log(files[0]);
      let path = URL.createObjectURL(files[0]);
      setArtifactFromImage(path);
    };

    const setArtifactFromImage = async (path) => {
      let result = await Tesseract.recognize(path, "eng");
      console.log(result.data);
      let text = result.data.text;
      let artifact_ = Artifact.fromString(text);
      setArtifact(artifact_);
      console.log(text);
    };

    const pasteFunc = (e) => uploadImage(e.clipboardData.files);
    window.addEventListener("paste", pasteFunc);
    return () => {
      window.removeEventListener("paste", pasteFunc);
    };
  }, []);

  return (
    <Modal open={open} onClose={() => change(false)}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add Artifact
        </Typography>
        {/* TODO: useArtifact value */}
        <NumberInput
          min={0}
          max={20}
          value={artifact.level}
          setValue={(value) =>
            setArtifact((prev) => ({
              ...prev,
              level: value,
            }))
          }
          isInt={true}
          sx={{ mb: 2 }}
        />

        {[0, 1, 2, 3].map((index) => {
          return (
            <SubstatInput
              value={artifact.substats[index].value}
              setValue={(value) =>
                setArtifact((prev) => {
                  prev.substats[index].value = value;
                  return { ...prev };
                })
              }
              key={index}
              key_={artifact.substats[index].key}
              setKey={(key) =>
                setArtifact((prev) => {
                  prev.substats[index].key = key;
                  return { ...prev };
                })
              }
            />
          );
        })}

        {error ? (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        ) : undefined}
        <Typography variant="h6" component="h2" gutterBottom>
          Estimated Score at (+20)
        </Typography>

        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography>MIN : {scores.minScore.toFixed(1)}</Typography>
          <Typography>AVG : {scores.avgScore.toFixed(1)}</Typography>
          <Typography>MAX : {scores.maxScore.toFixed(1)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              if (target === null) change(false);
              else {
                setArtifacts({ type: "DELETE", id: target });
                change(false);
              }
            }}
            startIcon={
              target === null ? <DoDisturbRounded /> : <DeleteForeverRounded />
            }
          >
            {target === null ? "CANCEL" : "DELETE"}
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={error !== undefined}
            onClick={() => complete()}
            startIcon={target === null ? <AddRounded /> : <SaveRounded />}
          >
            {target === null ? "ADD" : "SAVE"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
