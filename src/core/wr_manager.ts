import { WRNoun } from "./wr_noun";

export abstract class WRManager extends WRNoun{
    constructor(managerName: string){
        super(managerName);
    }
}