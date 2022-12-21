import { Box } from "@mui/material";
import { useContext, useMemo } from "react";
import { ArtifactsContext } from "../../utils/contexts/ArtifactsContext";
import { AddArtifactCard } from "./AddArtifactCard";
import ArtifactCard from "./ArtifactCard";

export const ArtifactList = () => {
  const { artifacts } = useContext(ArtifactsContext);
  const artifactsRendered = useMemo(() => {
    return artifacts.map((artifact, id) => (
      <ArtifactCard targetId={id} place={id+1} artifact={artifact} />
    ));
  }, [artifacts]);

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap" gap={1} m={1}>
      {artifactsRendered}
      <AddArtifactCard />
    </Box>
  );
};
