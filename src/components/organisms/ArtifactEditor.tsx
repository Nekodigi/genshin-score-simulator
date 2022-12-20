import { Alert, Box, Modal, TextField, Typography } from "@mui/material";
import { NumberInput } from "../atoms/NumberInput";
import React, { useState, useCallback, useEffect, useMemo } from "react";
import { SubstatInput } from "../molecules/SubstatInput";
import { SubstatKeys } from "../../utils/types/Substat";
import { ArtifactValue } from "../../utils/types/Artifact";
import { Artifact } from "../../utils/class/Artifact";

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

export const ArtifactEditor = ({ open, setOpen }) => {
  const [artifact, setArtifact] = useState<ArtifactValue>(
    new Artifact().toValue()
  );

  const [value, setValue] = useState(0);
  const [key, setKey] = useState<SubstatKeys>("ERR");

  const error = useMemo(() => {
    let allSubstate = true;
    artifact.substats.forEach((ss) => {
      if (ss.key === "ERR") allSubstate = false;
    });
    if (!allSubstate)
      return "4 sub-stats are required to estimate 5 star artifact score.";
    else return undefined;
  }, [artifact]);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Add Artifact
        </Typography>

        <NumberInput
          min={0}
          max={20}
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
              setValue={(value) =>
                setArtifact((prev) => {
                  prev.substats[index].value = value;
                  return { ...prev };
                })
              }
              setKey={(key) =>
                setArtifact((prev) => {
                  prev.substats[index].key = key;
                  return { ...prev };
                })
              }
            />
          );
        })}
        {error ? <Alert severity="error">{error}</Alert> : undefined}

        <TextField label="Level" type="number" fullWidth />
      </Box>
    </Modal>
  );
};
