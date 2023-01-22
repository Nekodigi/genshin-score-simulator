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
import { toSortKeyScore } from "../../utils/func/Sort";
import { TwoCellText } from "../molecules/TwoCellText";
import { StatIcon, StatValue2Str } from "../atoms/StatIcon";
import { ArtifactType } from "../../utils/types/Artifact";
import artifactsDB from "../../utils/consts/genshindb-partial.json";
import { useTranslation } from "react-i18next";
import { mainstatValueTable } from "../../utils/consts/Mainstat";

type ArtifactCardProps = {
  targetId: string;
  artifact: ArtifactType;
};

const ArtifactCard = (props: ArtifactCardProps) => {
  const { targetId, artifact } = props;
  const theme = useTheme();
  const { artifacts } = useContext(ArtifactsContext);
  const { editor, sort } = useContext(EditorContext);
  const { t, i18n } = useTranslation("artifact");

  const scores = useMemo(() => new Artifact(artifact).getScores(), [artifact]);

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
          artifact.rarity !== undefined ? (
            <StatIcon
              statKey={artifact.mainStatKey}
              value={
                mainstatValueTable[artifact.rarity][artifact.mainStatKey][
                  artifact.level
                ]
              }
              size={16}
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
            substat.key !== "ERR" ? (
              <StatIcon
                key={i}
                statKey={substat.key}
                value={substat.value}
                size={16}
                full
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
