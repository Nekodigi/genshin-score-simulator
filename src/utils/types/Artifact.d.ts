import { SubstatValue } from "./Substat";

type ArtifactValue = {
  substats: SubstatValue[];
  level: number;
};

type Scores = {
  minScore: number;
  avgScore: number;
  maxScore: number;
};

export type { ArtifactValue, Scores };
