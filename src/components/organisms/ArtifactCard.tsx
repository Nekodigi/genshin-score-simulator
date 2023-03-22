/** @jsxImportSource @emotion/react */

import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import { useContext, useMemo } from "react";
import { Artifact } from "../../utils/class/Artifact";
import { EditorContext } from "../../utils/contexts/EditorContext";
import { fontTypes } from "../../utils/styles/fonts";
import { toSortKeyScore } from "../../utils/func/Sort";
import { StatIcon } from "../atoms/StatIcon";
import { ArtifactType } from "../../utils/types/Artifact";
import { mainstatValueTable } from "../../utils/consts/Mainstat";

type ArtifactCardProps = {
  targetId: string;
  artifact: ArtifactType;
};

const ArtifactCard = (props: ArtifactCardProps) => {
  const { targetId, artifact } = props;
  const theme = useTheme();
  const { editor, sort, weight } = useContext(EditorContext);

  const scores = useMemo(
    () => new Artifact(weight, artifact).getScores(),
    [weight, artifact]
  );

  return (
    // minWidth: 304, flexGrow: 1, height: 240
    <Grid item xs={12} sm={6} md={4}>
      <Card
        // sx={{ flex: "1 1 304px", maxWidth: 400 }}
        onClick={() => editor.change(true, targetId)}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          position="relative"
          overflow="hidden"
          sx={{ background: theme.palette.com.artifactBg, p: 1 }}
        >
          {artifact.setKey !== undefined && artifact.slotKey !== undefined ? (
            <img
              style={{ position: "absolute", top: -16, right: "0", width: 192 }}
              src={`Artifacts/${artifact.setKey}/${artifact.slotKey}.png`}
              alt={"artifact preview"}
            />
          ) : undefined}
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
          {artifact.mainStatKey !== undefined &&
          artifact.mainStatKey !== "" &&
          artifact.rarity !== undefined ? (
            <StatIcon
              statKey={artifact.mainStatKey}
              value={
                mainstatValueTable[artifact.rarity][artifact.mainStatKey][
                  artifact.level
                ]
              }
              size={16}
              sx={{ color: theme.palette.com.white }}
              full
            />
          ) : undefined}
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          gap={1}
          color={theme.palette.text.secondary}
          sx={{ background: theme.palette.local.paper, p: 1 }}
        >
          {artifact.substats.map((substat, i) =>
            substat.key !== "" ? (
              <StatIcon
                key={i}
                statKey={substat.key}
                value={substat.value}
                size={16}
                full
              />
            ) : (
              <Box key={i} height={20} />
            )
          )}
        </Box>
      </Card>
    </Grid>
  );
};
export default ArtifactCard;
