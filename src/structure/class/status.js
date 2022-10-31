const field = require("../const/field").field;

export class Status{
    constructor(field_, value, preValue){
        this.field = field_ ? field_ : "ERR";
        this.value = value ? value : 0;
        this.preValue = preValue ? preValue : this.value;
        this.w = field[this.field].w;
        this.table = field[this.field].table;
    }
    
    static fromString(str){
        var datas = str.split("+");
        var ext = datas[0].split(" ").length === 2 ? datas[0].split(" ")[1].substring(0, 1) : undefined
        ext = ext ? ext : str.slice(-1) === "%" ? "%" : undefined;
        var name = datas[0].substring(0, 3);
        name = ext ? name.substring(0, 2)+ext : name;
        var value = Number(datas[1].replace("%", ""));
        //console.log(name);
        //console.log(value);

        return new Status(name, value);
    }

    setValueByStr(raw){
        if(typeof raw === "string"){
            //console.log("S"+raw);
            var value_ = raw.slice(-1) !== "." ? (isNaN(parseFloat(raw)) ? 0 : parseFloat(raw)) : raw;
            //value_ = isNaN(value_) ? 0 : value_;
            //console.log(value_);
            this.preValue = value_;
            this.value = parseFloat(raw);
        }else if(typeof raw === "number"){
            this.preValue = raw;
            this.value = raw;
        }else{
            console.log("Status init error");
        }
    }

    clone(){
        return new Status(this.field, this.value, this.preValue);
    }

    toString(){
        return this.field+"+"+this.value.toFixed(1);
    }

    render(){
        
        return field[this.field].name.replace("%", "")+"+"+this.value.toFixed(1)+(field[this.field].name.slice(-1) === "%" ? "%" : "");
    }

    score(){
        return this.w * this.value;
    }

    upgrade(i){
        this.value+=this.table[i];
    }

    upgradeRandom(){
        this.upgrade(Math.floor(Math.random()*4));
    }

    upgradeAvg(){
        this.value+=this.table.reduce((acm, c) => acm+c)/4;//return average
    }

    upgradeAvgPartial(w){
        this.value+=this.table.reduce((acm, c) => acm+c)/4*w;//return average
    }
}

//module.exports.Status = Status;