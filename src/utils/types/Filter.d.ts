import { setKeyType, slotKeyType } from "../consts/Artifact";
import { statKeyType } from "../consts/Stat";

export type Filter = {
  level: number[];
  score: number[];
  substat: number[];
  slot: slotKeyType[];
  set: setKeyType;
  mainstat: statKeyType;
};
