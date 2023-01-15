import { substatDef } from "../consts/Substat";

type SubstatValue = {
  key: substatKeys;
  value: number;
};

type SubstatWeight = {
  hp: number;
  atk: number;
  def: number;
  hp_: number;
  atk_: number;
  def_: number;
  eleMas: number;
  enerRech_: number;
  critRate_: number;
  critDMG_: number;
};

type SubstatKeys = keyof typeof substatDef;

export type { SubstatKeys, SubstatValue, SubstatWeight };
