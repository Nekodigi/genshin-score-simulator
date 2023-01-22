import { AlertColor } from "@mui/material";
import { createContext } from "react";
import { ArtifactType } from "../types/Artifact";
import { Filter } from "../types/Filter";
import { Sort } from "../types/Sort";
import { SubstatWeight } from "../types/Substat";

export type EditorContextProps = {
  editor: {
    open: boolean;
    setOpen: (value: boolean) => void;
    info: Info | undefined;
    setInfo: (value: Info | undefined) => void;
    target: string | null;
    setTarget: (value: string | null) => void;
    artifact: ArtifactType;
    setArtifact: React.Dispatch<React.SetStateAction<ArtifactType>>;
    change: (open: boolean, id?: string) => void;
  };
  drawer: {
    open: boolean;
    setOpen: (value: boolean) => void;
  };
  importer: {
    open: boolean;
    setOpen: (value: boolean) => void;
  };
  formulaEditor: {
    open: boolean;
    setOpen: (value: boolean) => void;
  };

  weight: SubstatWeight;
  setWeight: (value: SubstatWeight) => void;
  filter: Filter;
  setFilter: (value: Filter) => void;
  sort: Sort;
  setSort: React.Dispatch<React.SetStateAction<Sort>>;
};
const EditorContext = createContext({} as EditorContextProps);

export { EditorContext };

export type Info = {
  sevarity: AlertColor;
  text: string;
};
