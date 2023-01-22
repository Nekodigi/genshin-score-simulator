
import { Artifact } from "../class/Artifact";
import { ArtifactType } from "../types/Artifact";
import { Filter } from "../types/Filter";
import { Sort } from "../types/Sort";
import { SubstatWeight } from "../types/Substat";

type ArtifactsActionType = "ADD" | "DELETE" | "UPDATE" | "SORT";

type ArtifactsAction = {
  type: ArtifactsActionType;
  artifact?: ArtifactType;
  id?: string;
};

export const ArtifactFilter = (
  weight: SubstatWeight,
  artifact: ArtifactType,
  filter: Filter,
  sort: Sort
) => {
  let score = new Artifact(weight, artifact).getScores()[sort.key];
  if (score === undefined)
    score = new Artifact(weight, artifact).getScores().avgScore;
  let ok = true;
  ok =
    ok &&
    filter.level[0] <= artifact.level &&
    artifact.level <= filter.level[1];
  ok =
    ok &&
    filter.score[0] <= score &&
    (filter.score[1] === 61 ? true : score < filter.score[1]);
  if (filter.set !== "") ok = ok && filter.set === artifact.setKey;
  if (filter.mainstat !== "")
    ok = ok && filter.mainstat === artifact.mainStatKey;
  if (artifact.slotKey) ok = ok && filter.slot.includes(artifact.slotKey);
  return ok;
};

export const ArtifactComparator = (
  weight: SubstatWeight,
  a: ArtifactType,
  b: ArtifactType,
  sort: Sort
) => {
  // const sort: Sort = { key: "avgScore", desc: true };
  switch (sort.key) {
    case "minScore":
      return (
        (new Artifact(weight, b).getScores().minScore -
          new Artifact(weight, a).getScores().minScore) *
        (sort.desc ? 1 : -1)
      );
    case "avgScore":
      return (
        (new Artifact(weight, b).getScores().avgScore -
          new Artifact(weight, a).getScores().avgScore) *
        (sort.desc ? 1 : -1)
      );
    case "maxScore":
      return (
        (new Artifact(weight, b).getScores().maxScore -
          new Artifact(weight, a).getScores().maxScore) *
        (sort.desc ? 1 : -1)
      );
  }
};

export const ArtifactsReducer = (
  state: ArtifactType[],
  action: ArtifactsAction
): ArtifactType[] => {
  const { type, artifact, id } = action;

  switch (type) {
    case "ADD":
      if (artifact !== undefined) {
        artifact.id = state.length.toString();
        state.push(artifact);
        //auto desc sort by score
        break;
      } else throw new Error("DELETE : artifact missing");
    case "UPDATE":
      if (id !== undefined && artifact !== undefined) {
        state[id] = artifact;
        break;
      } else throw new Error("UPDATE : id or artifact missing");
    case "DELETE":
      if (id !== undefined) {
        state = state.filter((a) => a.id !== id);
        //state.splice(id, 1);

        break;
      } else throw new Error("DELETE : id missing");
    case "SORT":
      break;
    default:
      return state;
  }
  // state = state.sort((a, b) => ArtifactComparator(a, b, sort));
  return [...state]; //to assert it's updated
};

export type { ArtifactsAction };
