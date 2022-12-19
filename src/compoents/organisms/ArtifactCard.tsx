import { Box, Card, CardContent, Typography } from "@mui/material";
import { Artifact } from "../../utils/types/Artifact";
import { scoreSet } from "../../utils/types/Score";
import { substatKeys, substatValue } from "../../utils/types/Substat";

type ArtifactCardProps = {
  place: number;
  score: scoreSet;
  artifact: Artifact;
};

const ArtifactCard = (props: ArtifactCardProps) => {
  const { place, score, artifact } = props;
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          #{place}
        </Typography>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          AVG:{score.avgScore}
        </Typography>
        <Box display="flex" flexDirection="row">
          <Typography sx={{ mb: 1.5, flexGrow: 1 }} color="text.secondary">
            MIN:{score.minScore}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            MAX:{score.maxScore}
          </Typography>
        </Box>

        <Typography variant="body2">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default ArtifactCard;
