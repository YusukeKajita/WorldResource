import { WRNoun } from "./wr_noun";

export abstract class WRManager extends WRNoun{
    constructor(managerName: string){
        super(managerName);
    }
}


export abstract class WRCatalog<T extends WRNoun> extends WRNoun{
    itemDict: Map<string,T>;
    
    constructor(name: string, jsonText: string){
        super(name);
        this.itemDict = new Map<string,T>();
        this.readFrom(jsonText);
    }

    readFrom(jsonText:string, reset:boolean = true){
        const jsonObject :T[] = JSON.parse(jsonText);

        if(reset) this.itemDict.clear();
        jsonObject.forEach((v,i,a)=>{
            this.itemDict.set(v.name, this.read(v));
        });
    }

    protected abstract read(item: T):T; 
}

export abstract class WRFactory<T extends WRNoun> extends WRNoun{
    protected constructor(name: string){
        super(name)
    }
    abstract create():T;
}

export abstract class WRFactoryProps<T extends WRNoun>{
    
}