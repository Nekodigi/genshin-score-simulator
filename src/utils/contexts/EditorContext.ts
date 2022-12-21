import { createContext } from "react";

type EditorContextProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  target: number | null;
  setTarget: (value: number | null) => void;
};
const EditorContext = createContext({} as EditorContextProps);

export { EditorContext };
