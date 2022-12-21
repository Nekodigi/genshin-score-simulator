import { Card, CardContent, Divider, Typography } from "@mui/material";
import { useContext, useMemo } from "react";
import { Artifact } from "../../utils/class/Artifact";
import { Substat } from "../../utils/class/Substat";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { ArtifactValue } from "../../utils/types/Artifact";
import { TwoCellText } from "../molecules/TwoCellText";

type ArtifactCardProps = {
  place: number;
  targetId: number;
  artifact: ArtifactValue;
};

const ArtifactCard = (props: ArtifactCardProps) => {
  const { place, targetId, artifact } = props;
  const { artifacts } = useContext(ArtifactsContext);
  const { change } = useContext(EditorContext);

  const scores = useMemo(() => new Artifact(artifact).getScores(), [artifact]);

  return (
    // minWidth: 304, flexGrow: 1, height: 240
    <Card
      sx={{ flex: "1 1 304px", height: 240 }}
      onClick={() => change(true, targetId)}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          #{place}
        </Typography>
        <Typography gutterBottom>AVG : {scores.avgScore.toFixed(1)}</Typography>
        <TwoCellText
          text1={`MIN : ${scores.minScore.toFixed(1)}`}
          text2={`MAX : ${scores.maxScore.toFixed(1)}`}
          sx={{ mb: 1 }}
        />
        <Divider sx={{ mb: 1 }} />
        <Typography gutterBottom>(+{artifact.level})</Typography>
        <TwoCellText
          text1={`${new Substat(artifact.substats[0]).toString()}`}
          text2={`${new Substat(artifact.substats[1]).toString()}`}
          sx={{ mb: 1 }}
        />
        <TwoCellText
          text1={`${new Substat(artifact.substats[2]).toString()}`}
          text2={`${new Substat(artifact.substats[3]).toString()}`}
          sx={{ mb: 1 }}
        />
      </CardContent>
    </Card>
  );
};
export default ArtifactCard;
