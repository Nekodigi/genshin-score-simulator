import { Substat } from "./Substat";

//ATK+4.1%
//攻 撃 カ +④①
test("Substatus from string", () => {
  const substatEn = Substat.fromString("ATK+4.1%");
  expect(substatEn).toEqual({ key: "atk_", value: 4.1 });
  const substatJp = Substat.fromString("攻 撃 カ +④①%");
  expect(substatJp).toEqual({ key: "atk", value: 41 });
});
