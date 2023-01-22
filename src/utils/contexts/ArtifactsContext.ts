import { createContext } from "react";
import { ArtifactType } from "../types/Artifact";
import React from "react";
import { ArtifactsAction } from "../reducers/Artifact";

type ArtifactsContextProps = {
  artifacts: ArtifactType[];
  setArtifacts: React.Dispatch<ArtifactsAction>;
};
const ArtifactsContext = createContext({} as ArtifactsContextProps);

export { ArtifactsContext };
