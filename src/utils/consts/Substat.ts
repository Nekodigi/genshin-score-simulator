const substatDef = {
  hp: {
    weight: 0,
    abri: "HP ",
    name: "HP",
    table: [209.13, 239.0, 268.88, 298.75],
  },
  atk: {
    weight: 0,
    name: "ATK",
    abri: "ATK",
    table: [13.62, 15.56, 17.51, 19.45],
  },
  def: {
    weight: 0,
    name: "DEF",
    abri: "DEF",
    table: [16.2, 18.52, 20.83, 23.15],
  },
  hp_: {
    weight: 0,
    name: "HP%",
    abri: "HP%",
    table: [4.08, 4.66, 5.25, 5.83],
  },
  atk_: {
    weight: 1,
    name: "ATK%",
    abri: "AT%",
    table: [4.08, 4.66, 5.25, 5.83],
  },
  def_: {
    weight: 0,
    name: "DEF%",
    abri: "DE%",
    table: [5.1, 5.83, 6.56, 7.29],
  },
  eleMas: {
    weight: 0,
    name: "EM",
    abri: "ElM",
    table: [16.32, 18.65, 20.98, 23.31],
  },
  enerRech_: {
    weight: 0,
    name: "ER%",
    abri: "EnR",
    table: [4.53, 5.18, 5.83, 6.48],
  },
  critRate_: {
    weight: 2,
    name: "CRIT Rate%",
    abri: "CRR",
    table: [2.72, 3.11, 3.5, 3.89],
  },
  critDMG_: {
    weight: 1,
    name: "CRIT DMG%",
    abri: "CRD",
    table: [5.44, 6.22, 6.99, 7.77],
  },
  ERR: {
    weight: 0,
    name: "Substat",
    abri: "",
    good: "error",
    table: [0, 0, 0, 0],
  },
} as const;

export { substatDef };
