import {
  faAtk,
  faCritDmg,
  faCritRate,
  faDef,
  faElementalMastery,
  faEnergyRecharge,
  faHp,
} from "../../components/atoms/faIcons";

const substatDef = {
  hp: {
    weight: 0,
    abri: "HP ",
    name: { en: "HP", ja: "HP" },
    icon: faHp,
    table: [209.13, 239.0, 268.88, 298.75],
  },
  hp_: {
    weight: 0,
    name: { en: "HP%", ja: "HP%" },
    abri: "HP%",
    icon: faHp,
    table: [4.08, 4.66, 5.25, 5.83],
  },
  atk: {
    weight: 0,
    name: { en: "ATK", ja: "攻撃力" },
    icon: faAtk,
    table: [13.62, 15.56, 17.51, 19.45],
  },
  atk_: {
    weight: 1,
    name: { en: "ATK%", ja: "攻撃力%" },
    icon: faAtk,
    table: [4.08, 4.66, 5.25, 5.83],
  },
  def: {
    weight: 0,
    name: { en: "DEF", ja: "防御力" },
    icon: faDef,
    table: [16.2, 18.52, 20.83, 23.15],
  },
  def_: {
    weight: 0,
    name: { en: "DEF%", ja: "防御力%" },
    icon: faDef,
    table: [5.1, 5.83, 6.56, 7.29],
  },
  eleMas: {
    weight: 0,
    name: { en: "Elemental Mastery", ja: "元素熟知" },
    icon: faElementalMastery,
    table: [16.32, 18.65, 20.98, 23.31],
  },
  enerRech_: {
    weight: 0,
    name: { en: "Energy Recharge%", ja: "元素チャージ効率%" },
    icon: faEnergyRecharge,
    table: [4.53, 5.18, 5.83, 6.48],
  },
  critRate_: {
    weight: 2,
    name: { en: "CRIT Rate%", ja: "会心率" },
    icon: faCritRate,
    table: [2.72, 3.11, 3.5, 3.89],
  },
  critDMG_: {
    weight: 1,
    name: { en: "CRIT DMG%", ja: "会心ダメージ%" },
    icon: faCritDmg,
    table: [5.44, 6.22, 6.99, 7.77],
  },
  ERR: {
    weight: 0,
    name: { en: "Substat", ja: "サブステータス" },
    icon: undefined,
    table: [0, 0, 0, 0],
  },
} as const;

export { substatDef };
