import { AddRounded } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { useContext } from "react";
import { EditorContext } from "../../utils/contexts/EditorContext";

export const AddArtifactCard = () => {
  const { change } = useContext(EditorContext);

  return (
    <Card
      sx={{ flex: "1 1 304px", maxWidth: 420, height: 240 }}
      onClick={() => change(true)}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Add Artifact
        </Typography>
        <AddRounded
          sx={{
            margin: "auto",
            fontSize: 120,
            width: "100%",
            color: "text.secondary",
          }}
        />
      </CardContent>
    </Card>
  );
};
