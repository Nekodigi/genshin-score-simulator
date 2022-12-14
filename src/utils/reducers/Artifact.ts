import { Artifact } from "../class/Artifact";
import { ArtifactValue } from "../types/Artifact";

type ArtifactsActionType = "ADD" | "DELETE" | "UPDATE";

type ArtifactsAction = {
  type: ArtifactsActionType;
  artifact?: ArtifactValue;
  id?: number;
};

export const ArtifactsReducer = (
  state: ArtifactValue[],
  action: ArtifactsAction
): ArtifactValue[] => {
  const { type, artifact, id } = action;
  switch (type) {
    case "ADD":
      if (artifact !== undefined) {
        state.push(artifact);
        //auto desc sort by score
        state = state.sort(
          (a, b) =>
            new Artifact(b).getScores().avgScore -
            new Artifact(a).getScores().avgScore
        );
        return [...state]; //to assert it's updated
      } else throw new Error("DELETE : artifact missing");
    case "UPDATE":
      if (id !== undefined && artifact !== undefined) {
        state[id] = artifact;
        return [...state];
      } else throw new Error("UPDATE : id or artifact missing");
    case "DELETE":
      if (id !== undefined) {
        state.splice(id, 1);
        return [...state];
      } else throw new Error("DELETE : id missing");
    default:
      return state;
  }
};

export type { ArtifactsAction };
