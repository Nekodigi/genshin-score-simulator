import { substatDef } from "../consts/Substat";

type SubstatValue = {
  key: substatKeys;
  value: number;
};

type SubstatKeys = keyof typeof substatDef;

export type { SubstatKeys, SubstatValue };
