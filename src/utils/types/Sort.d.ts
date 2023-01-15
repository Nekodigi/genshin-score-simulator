import { ArtifactValue } from "./Artifact";

export type SortKey = "minScore" | "avgScore" | "maxScore";

export type Sort = {
  key: SortKey;
  comparator: (a: ArtifactValue, b: ArtifactValue) => number;
  desc: boolean;
};
