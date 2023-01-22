//table can be replaced by min and step?

import {
  faAnemo,
  faAtk,
  faCritDmg,
  faCritRate,
  faCryo,
  faDef,
  faDendro,
  faElectro,
  faElementalMastery,
  faEnergyRecharge,
  faGeo,
  faHealingBonus,
  faHp,
  faHydro,
  faPhysicalDmgBonus,
  faPyro,
} from "../../components/atoms/faIcons";

const statDef = {
  hp: {
    weight: 0,
    abri: "HP ",
    name: { en: "HP", ja: "HP" },
    table: [209.13, 239.0, 268.88, 298.75],
    icon: faHp,
  },
  hp_: {
    weight: 0,
    name: { en: "HP%", ja: "HP%" },
    abri: "HP%",
    table: [4.08, 4.66, 5.25, 5.83],
    icon: faHp,
  },
  atk: {
    weight: 0,
    name: { en: "ATK", ja: "攻撃力" },
    table: [13.62, 15.56, 17.51, 19.45],
    icon: faAtk,
  },
  atk_: {
    weight: 1,
    name: { en: "ATK%", ja: "攻撃力%" },
    table: [4.08, 4.66, 5.25, 5.83],
    icon: faAtk,
  },
  def: {
    weight: 0,
    name: { en: "DEF", ja: "防御力" },
    table: [16.2, 18.52, 20.83, 23.15],
    icon: faDef,
  },
  def_: {
    weight: 0,
    name: { en: "DEF%", ja: "防御力%" },
    table: [5.1, 5.83, 6.56, 7.29],
    icon: faDef,
  },
  eleMas: {
    weight: 0,
    name: { en: "Elemental Mastery", ja: "元素熟知" },
    table: [16.32, 18.65, 20.98, 23.31],
    icon: faElementalMastery,
  },
  enerRech_: {
    weight: 0,
    name: { en: "Energy Recharge%", ja: "元素チャージ効率%" },
    table: [4.53, 5.18, 5.83, 6.48],
    icon: faEnergyRecharge,
  },
  heal_: {
    weight: 0,
    name: { en: "Healing Bonus", ja: "与える治療効果" },
    table: [4.53, 5.18, 5.83, 6.48],
    icon: faHealingBonus,
  },
  critRate_: {
    weight: 2,
    name: { en: "CRIT Rate%", ja: "会心率%" },
    table: [2.72, 3.11, 3.5, 3.89],
    icon: faCritRate,
  },
  critDMG_: {
    weight: 1,
    name: { en: "CRIT DMG%", ja: "会心ダメージ%" },
    table: [5.44, 6.22, 6.99, 7.77],
    icon: faCritDmg,
  },

  physical_dmg_: {
    weight: 0,
    name: { en: "Physical DMG Bonus", ja: "物理ダメージバフ" },
    table: [0, 0, 0, 0],
    icon: faPhysicalDmgBonus,
  },
  anemo_dmg_: {
    weight: 0,
    name: { en: "Anemo DMG Bonus", ja: "風元素ダメージ" },
    table: [0, 0, 0, 0],
    icon: faAnemo,
  },
  geo_dmg_: {
    weight: 0,
    name: { en: "Geo DMG Bonus", ja: "岩元素ダメージ" },
    table: [0, 0, 0, 0],
    icon: faGeo,
  },
  electro_dmg_: {
    weight: 0,
    name: { en: "Electro DMG Bonus", ja: "雷元素ダメージ" },
    table: [0, 0, 0, 0],
    icon: faElectro,
  },
  hydro_dmg_: {
    weight: 0,
    name: { en: "Hydro DMG Bonus", ja: "水元素ダメージ" },
    table: [0, 0, 0, 0],
    icon: faHydro,
  },
  pyro_dmg_: {
    weight: 0,
    name: { en: "Pyro DMG Bonus", ja: "炎元素ダメージ" },
    table: [0, 0, 0, 0],
    icon: faPyro,
  },
  cryo_dmg_: {
    weight: 0,
    name: { en: "Cryo DMG Bonus", ja: "氷元素ダメージ" },
    table: [0, 0, 0, 0],
    icon: faCryo,
  },
  dendro_dmg_: {
    weight: 0,
    name: { en: "Dendro DMG Bonus", ja: "草元素ダメージ" },
    table: [0, 0, 0, 0],
    icon: faDendro,
  },
  // ERR: {
  //   weight: 0,
  //   name: { en: "Substat", ja: "サブステータス" },
  //   table: [0, 0, 0, 0],
  //   icon: undefined,
  // },
  "": {
    weight: 0,
    name: { en: "", ja: "" },
    table: [0, 0, 0, 0],
    icon: undefined,
  },
} as const;

export { statDef };

export const statKey = [
  "",
  "hp",
  "hp_",
  "atk",
  "atk_",
  "def",
  "def_",
  "eleMas",
  "enerRech_",
  "heal_",
  "critRate_",
  "critDMG_",
  "physical_dmg_",
  "anemo_dmg_",
  "geo_dmg_",
  "electro_dmg_",
  "hydro_dmg_",
  "pyro_dmg_",
  "cryo_dmg_",
  "dendro_dmg_",
  // "ERR",
];
export type statKeyType = keyof typeof statDef;
