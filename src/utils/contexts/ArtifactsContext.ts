import { createContext } from "react";
import { ArtifactValue } from "../types/Artifact";
import React from "react";
import { ArtifactsAction } from "../reducers/Artifact";

type ArtifactsContextProps = {
  artifacts: ArtifactValue[];
  setArtifacts: React.Dispatch<ArtifactsAction>;
};
const ArtifactsContext = createContext({} as ArtifactsContextProps);

export { ArtifactsContext };
