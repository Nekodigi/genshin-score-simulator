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
    this.value = isNaN(props.value) ? 0 : props.value;
    if (substatDef[props.key] === undefined) {
      this.weight = 0;
      this.valueTable = substatDef["ERR"].table as any;
    } else {
      this.weight = substatDef[props.key].weight;
      this.valueTable = substatDef[props.key as string].table;
    }
  }

  static plain(): SubstatValue {
    return { key: "ERR", value: 0 };
  }

  //possibly check lang by ascii
  //ATK+4.1%
  //攻 撃 カ +④①
  static fromString(str: string): SubstatValue {
    let datas = str.split("+");
    let first = str.charAt(1);

    let key = datas[0] + (str.slice(-1) === "%" ? "%" : "");
    var value_ = datas[1].replace("%", ""); //10% => 10
    if ("A" <= first && first <= "z") {
      console.log(str, "EN");
    } else {
      console.log(str, "JP");
      key = key.replaceAll(" ", "");
    }
    let value = Number(value_);

    console.log(
      key,
      datas,
      datas[0] + (str.slice(-1) === "%" ? "%" : "undefined")
    );
    let sk = Object.keys(substatDef).filter(
      (substatKey) => substatDef[substatKey as SubstatKeys].name.en === key
    )[0];
    // var ext =
    //   datas[0].split(" ").length === 2
    //     ? datas[0].split(" ")[1].substring(0, 1)
    //     : undefined; //ext could be CRIT "D"MG CRIT "R"ate
    // ext = ext ? ext : str.slice(-1) === "%" ? "%" : undefined; //ATK+X"%"
    // var key = datas[0].substring(0, 3); //"CRI"
    // key = ext ? key.substring(0, 2) + ext : key; //"CRD"
    // var value = Number(datas[1].replace("%", "")); //10% => 10
    // if (key.length === 2) key += " "; //HP => "HP "

    // let sk = Object.keys(substatDef).filter(
    //   (substatKey) => substatDef[substatKey].abri === key
    // )[0];
    return { key: sk as SubstatKeys, value };
  }

  toJson(): string {
    return JSON.stringify(this);
  }

  clone(): SubstatValue {
    return { key: this.key, value: this.value };
  }

  toString() {
    return `${substatDef[this.key].name.en.replace(
      "%",
      ""
    )}+${this.value.toFixed(1)}${
      substatDef[this.key].name.en.slice(-1) === "%" ? "%" : ""
    }`;
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
