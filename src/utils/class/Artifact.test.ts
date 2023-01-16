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
  const artifactEn = Artifact.fromString(
    "ATK+5.3%\nHP+11.1%\nCRIT DMG+13.2%\nDEF+81"
  );
  expect(artifactEn).toEqual(
    new Artifact({
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
  // const artifactJp = Artifact.fromString(
  //   "攻 撃 カ +④①\n攻 撃 カ +④.①%\n会 心 ダ メ ー ジ +①⑦.⑨%\n会 心 率 +③.⑤%"
  // );
  // expect(artifactJp).toEqual(
  //   new Artifact({
  //     level: 0,
  //     substats: [
  //       { key: "atk", value: 41 },
  //       { key: "atk_", value: 4.1 },
  //       { key: "critDMG_", value: 17.9 },
  //       { key: "critRate_", value: 3.5 },
  //     ],
  //   })
  // );
  // 攻 撃 カ +④①\n攻 撃 カ +④.①%\n会 心 ダ メ ー ジ +①⑦.⑨%\n会 心 率 +③.⑤%
});
