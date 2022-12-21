import { createContext } from "react";
import { ArtifactValue } from "../types/Artifact";

type EditorContextProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  target: number | null;
  setTarget: (value: number | null) => void;
  artifact: ArtifactValue;
  setArtifact: React.Dispatch<React.SetStateAction<ArtifactValue>>;
  change: (open: boolean, id?: number) => void;
};
const EditorContext = createContext({} as EditorContextProps);

export { EditorContext };
