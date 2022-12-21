import { Alert, Box, Modal, Typography, Button } from "@mui/material";
import { AddRounded, DoDisturbRounded } from "@mui/icons-material";
import { NumberInput } from "../atoms/NumberInput";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { SubstatInput } from "../molecules/SubstatInput";
import { ArtifactValue } from "../../utils/types/Artifact";
import { Artifact } from "../../utils/class/Artifact";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const ArtifactEditor = () => {
  const [artifact, setArtifact] = useState<ArtifactValue>(
    new Artifact().toValue()
  );
  const { artifacts, setArtifacts } = useContext(ArtifactsContext);
  let { open, setOpen, target } = useContext(EditorContext);

  const scores = useMemo(() => new Artifact(artifact).getScores(), [artifact]);

  //TODO: DEFINE open wrapper and include this
  useEffect(() => {
    if (target !== null) {
      //possiblly contain 0
      console.log(artifacts, target);
      setArtifact(artifacts[target]);
    }
  }, [target, artifacts]);

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
    setArtifact(new Artifact().toValue());
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add Artifact
        </Typography>
        {/* TODO: useArtifact value */}
        <NumberInput
          min={0}
          max={20}
          value={artifact.level}
          setValue={
            (value) =>
              setArtifact((prev) => ({
                ...prev,
                level: value,
              }))
            // setArtifact((prev) => {
            //   prev.level = value;
            //   return { ...prev };
            // })
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
            onClick={() => setOpen(false)}
            startIcon={<DoDisturbRounded />}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={error !== undefined}
            onClick={() => complete()}
            startIcon={<AddRounded />}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
