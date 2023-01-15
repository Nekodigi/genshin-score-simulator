import { createContext } from "react";
import { ArtifactValue } from "../types/Artifact";
import { Filter } from "../types/Filter";
import { Sort } from "../types/Sort";
import { SubstatWeight } from "../types/Substat";

type EditorContextProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  target: number | null;
  setTarget: (value: number | null) => void;
  artifact: ArtifactValue;
  setArtifact: React.Dispatch<React.SetStateAction<ArtifactValue>>;
  change: (open: boolean, id?: number) => void;
  weight: SubstatWeight;
  setWeight: (value: SubstatWeight) => void;
  filter: Filter;
  setFilter: (value: Filter) => void;
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
};
const EditorContext = createContext({} as EditorContextProps);

export { EditorContext };
