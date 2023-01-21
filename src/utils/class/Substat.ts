import { substatDef } from "../consts/Substat";
import { similarity } from "../func/string";
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
    let datas = str.split("+"); //plus could be lost
    if (datas.length === 1) {
      console.log("+ error");
      //could be plus detection ERROR
      for (let i = 0; i < datas[0].length; i++) {
        if ("⓪①②③④⑤⑥⑦⑧⑨0123456789".includes(datas[0][i])) {
          datas[1] = datas[0].substring(i);
          datas[0] = datas[0].substring(0, i);
          console.log(`split at ${i} ${datas[0]} ${datas[1]}`);
          break;
        }
      }
    }
    let first = str.charAt(1);

    let key_ = datas[0] + (str.slice(-1) === "%" ? "%" : "");
    var value_ = datas[1].replace("%", ""); //10% => 10
    let key = "ERR";
    if ("A" <= first && first <= "z") {
      console.log(str, "EN");
      key = Object.keys(substatDef).filter(
        (substatKey) => substatDef[substatKey as SubstatKeys].name.en === key_
      )[0];
    } else {
      console.log(str, "JP");
      const replaceList = [
        ["⓪", "0"],
        ["①", "1"],
        ["②", "2"],
        ["③", "3"],
        ["④", "4"],
        ["⑤", "5"],
        ["⑥", "6"],
        ["⑦", "7"],
        ["⑧", "8"],
        ["⑨", "9"],
      ];
      key_ = key_.replaceAll(" ", "").replaceAll("カ", "力");
      replaceList.forEach((replaceItem) => {
        value_ = value_.replaceAll(replaceItem[0], replaceItem[1]);
      });
      //some letter could be lost.
      //use nearest!
      key = Object.keys(substatDef).sort(
        (a, b) =>
          similarity(substatDef[b as SubstatKeys].name.ja, key_) -
          similarity(substatDef[a as SubstatKeys].name.ja, key_)
      )[0];
    }
    let value = Number(value_);

    console.log(key_, value_, value, key);

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
    return { key: key as SubstatKeys, value };
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
