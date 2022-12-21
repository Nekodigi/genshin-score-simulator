import { ArtifactValue, Scores } from "../types/Artifact";
import { SubstatValue } from "../types/Substat";
import { Substat } from "./Substat";

export class Artifact {
  substats: SubstatValue[];
  level: number;
  upgradeLeft: number = 0;

  constructor(
    props: ArtifactValue = {
      substats: [
        { key: "ERR", value: 0 },
        { key: "ERR", value: 0 },
        { key: "ERR", value: 0 },
        { key: "ERR", value: 0 },
      ],
      level: 0,
    }
  ) {
    this.substats = props.substats;
    this.level = props.level;
    this.upgradeLeftByLevel();
  }

  static fromString(str: string, level = 0) {
    var strs = str.split("\n");
    strs = strs.filter((str) => str !== "");
    var ss1 = Substat.fromString(strs[0]);
    var ss2 = Substat.fromString(strs[1]);
    var ss3 = Substat.fromString(strs[2]);
    var ss4 = strs.length >= 4 ? Substat.fromString(strs[3]) : new Substat();
    return new Artifact({ substats: [ss1, ss2, ss3, ss4], level });
  }

  toJson() {
    return JSON.stringify(this);
  }

  toValue(): ArtifactValue {
    return { level: this.level, substats: [...this.substats] };
  }

  static fromJson(json: string) {
    var artifact = Object.assign(new Artifact(), JSON.parse(json));
    return artifact;
  }

  clone() {
    return new Artifact(this.toValue());
  }

  toString() {
    return (
      this.substats[0].toString() +
      ", " +
      this.substats[1].toString() +
      ", " +
      this.substats[2].toString() +
      ", " +
      this.substats[3].toString() +
      ", " +
      this.level
    );
  }

  score() {
    return this.substats.reduce(
      (acum: number, current: SubstatValue): number =>
        acum + new Substat(current).score(),
      0
    );
  }

  upgradeLeftByLevel() {
    this.upgradeLeft = Math.ceil((20 - this.level) / 4);
  }

  upgradeMax() {
    var bestStatId = 0;
    this.substats.forEach((ss, i) => {
      if (
        new Substat(ss).weight > new Substat(this.substats[bestStatId]).weight
      )
        bestStatId = i;
    });
    for (let i = 0; i < this.upgradeLeft; i++)
      this.substats[bestStatId] = new Substat(
        this.substats[bestStatId]
      ).upgrade(3);
    return this;
  }

  upgradeAvg() {
    var w = this.upgradeLeft / 4;
    if (this.upgradeLeft === 0) w = 0;
    this.substats = this.substats.map((substat) =>
      new Substat(substat).upgradeAvgPartial(w)
    );
    return this;
  }

  upgradeMin() {
    var worstStatId = 0;
    this.substats.forEach((ss, i) => {
      if (
        new Substat(ss).weight < new Substat(this.substats[worstStatId]).weight
      )
        worstStatId = i;
    });
    for (let i = 0; i < this.upgradeLeft; i++)
      this.substats[worstStatId] = new Substat(
        this.substats[worstStatId]
      ).upgrade(3);
    return this;
  }

  getScores(): Scores {
    let minScore = this.clone().upgradeMin().score();
    let avgScore = this.clone().upgradeAvg().score();
    let maxScore = this.clone().upgradeMax().score();
    return { minScore, avgScore, maxScore };
  }

  printScores() {
    const res = this.getScores();
    console.log("=======CURRENT=======");
    console.log(this.score());
    console.log("Score: " + this.score());

    console.log("=======MINIMUM=======");
    console.log(res.minScore);
    console.log("Score: " + res.minScore);

    console.log("=======AVERAGE=======");
    console.log(res.avgScore);
    console.log("Score: " + res.avgScore);

    console.log("=======MAXIMUM=======");
    console.log(res.maxScore);
    console.log("Score: " + res.maxScore);
  }
}
