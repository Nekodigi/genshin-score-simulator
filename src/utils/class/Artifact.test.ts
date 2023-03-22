import { SubstatWeight } from "../types/Substat";
import { Artifact } from "./Artifact";

//TABLE
//HP
//ATK
//DEF
//HP%
//ATK%
//DEF%
//Elemental Mastery
//Energy Recharge%
//CRIT DMG%
//CRIT Rate%

//体力
//攻撃力
//

test("Artifact from string test", () => {
  let weight = {
    hp: 0,
    atk: 0,
    def: 0,
    hp_: 0,
    atk_: 1,
    def_: 0,
    eleMas: 0,
    enerRech_: 0,
    critRate_: 2,
    critDMG_: 1,
  } as SubstatWeight;

  const artifactEn = Artifact.fromString(
    weight,
    "ATK+5.3%\nHP+11.1%\nCRIT DMG+13.2%\nDEF+81"
  );
  expect(artifactEn).toEqual(
    new Artifact(weight, {
      level: 0,
      substats: [
        { key: "atk_", value: 5.3 },
        { key: "hp_", value: 11.1 },
        { key: "critDMG_", value: 13.2 },
        { key: "def", value: 81 },
      ],
    })
  );

  //give lang as arg??
  const artifactJp = Artifact.fromString(
    weight,
    // "攻 撃 カ +④①\n攻 撃 カ +④.①%\n会 心 ダ メ ー ジ +①⑦.⑨%\n会 心 率 +③.⑤%"
    "攻 撃 カ +①⑤.⑦%\n会 心 ダ メ ー ジ +①③.②%\n会 心 率 +⑨.③%\n攻 撃 カ +①⑥"
  );
  expect(artifactJp).toEqual(
    new Artifact(weight, {
      level: 0,
      substats: [
        { key: "atk_", value: 15.7 },
        { key: "critDMG_", value: 13.2 },
        { key: "critRate_", value: 9.3 },
        { key: "atk", value: 16 },
      ],
    })
  );

  const critRate = new Artifact(weight, {
    level: 0,
    substats: [
      { key: "atk", value: 14 },
      { key: "atk_", value: 4.7 },
      { key: "critRate_", value: 3.9 },
      { key: "", value: 0 },
    ],
  });
  expect(Math.round(critRate.getScores().maxScore * 10) / 10).toBe(43.6);

  const critDMG = new Artifact(weight, {
    level: 0,
    substats: [
      { key: "atk", value: 14 },
      { key: "atk_", value: 4.7 },
      { key: "critDMG_", value: 7.8 },
      { key: "", value: 0 },
    ],
  });
  expect(Math.round(critDMG.getScores().maxScore * 10) / 10).toBe(43.6);
  //   攻 撃 カ +①③.④%
  // 会 ダ メ ー ジ +①④.⑧%
  // 防 御 カ +②③
  // 会 心 率 +①0.⑤%
  // 攻 撃 カ +④①\n攻 撃 カ +④.①%\n会 心 ダ メ ー ジ +①⑦.⑨%\n会 心 率 +③.⑤%
});
