import { substatDef } from "../consts/Substat";
import { SubstatKeys, SubstatValue } from "../types/Substat";

type FourOption = 0 | 1 | 2 | 3;

export class Substat {
  key: SubstatKeys;
  value: number;
  weight: number;
  valueTable: number[];

  constructor(props: SubstatValue = { key: "ERR", value: 0 }) {
    this.key = props.key;
    this.value = props.value;
    this.weight = substatDef[props.key].weight;
    this.valueTable = substatDef[props.key as string].table;
  }

  static plain(): SubstatValue {
    return { key: "ERR", value: 0 };
  }

  static fromString(str: string): SubstatValue {
    var datas = str.split("+");
    var ext =
      datas[0].split(" ").length === 2
        ? datas[0].split(" ")[1].substring(0, 1)
        : undefined; //ext could be CRIT "D"MG CRIT "R"ate
    ext = ext ? ext : str.slice(-1) === "%" ? "%" : undefined; //ATK+X"%"
    var key = datas[0].substring(0, 3); //"CRI"
    key = ext ? key.substring(0, 2) + ext : key; //"CRD"
    var value = Number(datas[1].replace("%", "")); //10% => 10
    if (key.length === 2) key += " "; //HP => "HP "

    return { key: key as SubstatKeys, value };
  }

  toJson(): string {
    return JSON.stringify(this);
  }

  clone(): SubstatValue {
    return { key: this.key, value: this.value };
  }

  toString() {
    return `${substatDef[this.key].name.replace("%", "")}+${this.value.toFixed(
      1
    )}${substatDef[this.key].name.slice(-1) === "%" ? "%" : ""}`;
  }

  score() {
    return this.weight * this.value;
  }

  upgrade(i: FourOption): SubstatValue {
    this.value += this.valueTable[i];
    return this.clone();
  }

  upgradeRandom() {
    return this.upgrade(Math.floor(Math.random() * 4) as FourOption);
  }

  upgradeAvg() {
    this.value += this.valueTable.reduce((acm, c) => acm + c) / 4; //return average
    return this.clone();
  }

  upgradeAvgPartial(w: number) {
    this.value += (this.valueTable.reduce((acm, c) => acm + c) / 4) * w; //return average
    return this.clone();
  }
}

//module.exports.Status = Status;
