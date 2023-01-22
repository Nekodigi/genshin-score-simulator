import { substatKeyType } from "../consts/Substat";

export type SubstatType = {
  key: substatKeyType;
  value: number;
};

export type SubstatWeight = {
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
  "": number;
};
