import { statDef } from "./Stat";

export const substatKey = [
  "hp",
  "hp_",
  "atk",
  "atk_",
  "def",
  "def_",
  "eleMas",
  "enerRech_",
  "critRate_",
  "critDMG_",
  "ERR",
  "",
] as const;

export type substatKeyType = (typeof substatKey)[number];
