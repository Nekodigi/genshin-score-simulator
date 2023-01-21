import { similarity } from "../func/string";
import { Substat } from "./Substat";

//ATK+4.1%
//攻 撃 カ +④①
test("Substatus from string", () => {
  const substatEn = Substat.fromString("ATK+4.1%");
  expect(substatEn).toEqual({ key: "atk_", value: 4.1 });
  const substatJp = Substat.fromString("攻 撃 カ +④①");
  expect(substatJp).toEqual({ key: "atk", value: 41 });
  const substatJp2 = Substat.fromString("会 ダ メ ー ジ ④.①");
  expect(substatJp2).toEqual({ key: "critDMG_", value: 4.1 });
  //console.log(similarity("会ダメージ%", "会心ダメージ%"));//    0.8571428571428571
  //console.log(similarity("会ダメージ%", "会心率%")); //0.333
});
