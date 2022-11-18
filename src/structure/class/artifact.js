import { Status } from "./status";
//const field = require("../const/field").field;

export class Artifact{
    constructor(ss, level, preLevel, doEval){
        this.ss = ss ? ss : [new Status(),new Status(),new Status(),new Status()];
        this.level = level ? level : 0;
        this.preLevel = preLevel ? preLevel : (this.level === 0 ? "" : this.level);
        this.upgradeLeftByLevel();
        if(doEval !== undefined)this.eval();
    }

    static fromString(str, level){
        var strs = str.split("\n");
        strs = strs.filter(str => str !== '');
        console.log(strs);
        var ss1 = Status.fromString(strs[0]);
        var ss2 = Status.fromString(strs[1]);
        var ss3 = Status.fromString(strs[2]);
        var ss4 = Status.fromString(strs[3]);
        return new Artifact([ss1, ss2, ss3, ss4], level);
    }

    setLevelByStr(raw){
        if(typeof raw === "string"){
            //console.log("S"+raw);
            var value_ = raw==="" ? raw : (isNaN(parseFloat(raw)) ? 0 : Math.max(0, Math.min(20, parseFloat(raw))));
            //value_ = isNaN(value_) ? 0 : value_;
            //console.log(value_);
            this.preLevel = value_;
            this.level = parseFloat(raw);
        }else if(typeof raw === "number"){
            this.preLevel = raw;
            this.level = raw;
        }else{
            console.log("Status init error");
        }
    }

    clone(doEval){
        var artifact = new Artifact([this.ss[0].clone(), this.ss[1].clone(), this.ss[2].clone(), this.ss[3].clone()], this.level);
        if(doEval !== undefined)artifact.eval();
        return artifact;
    }

    toString(){
        return this.ss[0].toString()+", "+this.ss[1].toString()+", "+this.ss[2].toString()+", "+this.ss[3].toString()+", "+this.level;
    }

    score(){
        return (this.ss[0].score()+this.ss[1].score()+this.ss[2].score()+this.ss[3].score()).toFixed(1);
    }

    upgradeLeftByLevel(){
        this.upgradeLeft = Math.ceil((20-this.level)/4);
    }

    upgradeMax(){
        var bestStat = this.ss[0];
        bestStat = this.ss[1].w > bestStat.w ? this.ss[1] : bestStat;
        bestStat = this.ss[2].w > bestStat.w ? this.ss[2] : bestStat;
        bestStat = this.ss[3].w > bestStat.w ? this.ss[3] : bestStat;
        for(let i=0; i<this.upgradeLeft;i++)bestStat.upgrade(3);
        return this;
    }

    upgradeAvg(){
        var w = this.upgradeLeft/4;
        if(this.upgradeLeft === 0)w = 0;
        this.ss[0].upgradeAvgPartial(w);
        this.ss[1].upgradeAvgPartial(w);
        this.ss[2].upgradeAvgPartial(w);
        this.ss[3].upgradeAvgPartial(w);
        return this;
    }

    upgradeMin(){
        var bestStat = this.ss[0];
        bestStat = this.ss[1].w < bestStat.w ? this.ss[1] : bestStat;
        bestStat = this.ss[2].w < bestStat.w ? this.ss[2] : bestStat;
        bestStat = this.ss[3].w < bestStat.w ? this.ss[3] : bestStat;
        for(let i=0; i<this.upgradeLeft;i++)bestStat.upgrade(0);
        return this;
    }

    evalReady(){
        return this.ss[0].field!=="ERR" && this.ss[1].field!=="ERR" && this.ss[2].field!=="ERR" && this.ss[3].field!=="ERR";
    }

    eval(){
        this.upgradeLeftByLevel();
        this.min = this.clone().upgradeMin();
        this.avg = this.clone().upgradeAvg();
        this.max = this.clone().upgradeMax();
        return {current:this, min:this.min, avg:this.avg, max:this.max}
    }

    printEval(){
        const res = this.eval();
        console.log("=======CURRENT=======");
        console.log(res.current.toString());
        console.log("Score: "+res.current.score());

        console.log("=======MINIMUM=======");
        console.log(res.min.toString());
        console.log("Score: "+res.min.score());
        
        console.log("=======AVERAGE=======");
        console.log(res.avg.toString());
        console.log("Score: "+res.avg.score());

        console.log("=======MAXIMUM=======");
        console.log(res.max.toString());
        console.log("Score: "+res.max.score());
    }
}

//module.exports.Artifact = Artifact;