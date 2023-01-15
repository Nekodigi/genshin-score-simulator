/** @jsxImportSource @emotion/react */

import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { Artifact } from "../../utils/class/Artifact";
import { Substat } from "../../utils/class/Substat";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { fontTypes } from "../../utils/styles/fonts";
import { ArtifactValue } from "../../utils/types/Artifact";
import { toSortKeyScore } from "../../utils/func/Sort";
import { SubstatIcon } from "../atoms/SubstatIcon";
import { TwoCellText } from "../molecules/TwoCellText";

type ArtifactCardProps = {
  targetId: number;
  artifact: ArtifactValue;
};

const ArtifactCard = (props: ArtifactCardProps) => {
  const { targetId, artifact } = props;
  const theme = useTheme();
  const { artifacts } = useContext(ArtifactsContext);
  const { change, sort } = useContext(EditorContext);

  const scores = useMemo(() => new Artifact(artifact).getScores(), [artifact]);

  return (
    // minWidth: 304, flexGrow: 1, height: 240
    <Grid item xs={12} sm={6} md={4}>
      <Card
        // sx={{ flex: "1 1 304px", maxWidth: 400 }}
        onClick={() => change(true, targetId)}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          sx={{ background: theme.palette.com.artifactBg, p: 1 }}
        >
          <Typography
            css={[fontTypes(theme).title, { color: theme.palette.com.white }]}
          >
            {scores[toSortKeyScore(sort.key)].toFixed(1)}
          </Typography>
          <Typography
            css={[
              fontTypes(theme).body,
              { color: theme.palette.com.whiteOp70 },
            ]}
          >
            {`${scores.minScore.toFixed(1)} ~ ${scores.avgScore.toFixed(
              1
            )} ~ ${scores.maxScore.toFixed(1)}`}
          </Typography>
          <Box
            display="flex"
            alignSelf="flex-start"
            px={0.75}
            py={0.25}
            borderRadius={1}
            sx={{
              background:
                theme.palette.com.scale[
                  10 + Math.floor(artifact.level / 4) * 10
                ],
            }}
          >
            <Typography
              css={[
                fontTypes(theme).disc,
                { color: theme.palette.com.black, fontWeight: 700 },
              ]}
            >
              +{artifact.level}
            </Typography>
          </Box>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          color={theme.palette.text.secondary}
          sx={{ background: theme.palette.local.paper, p: 1 }}
        >
          {artifact.substats.map((substat) =>
            substat.key !== "ERR" ? (
              <SubstatIcon
                statKey={substat.key}
                value={substat.value}
                size={16}
              />
            ) : (
              <Box height={20} />
            )
          )}
        </Box>
      </Card>
    </Grid>
  );
};
export default ArtifactCard;
