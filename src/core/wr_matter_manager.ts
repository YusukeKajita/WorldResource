// This class manage all of matter.

import { WRManager } from "./wr_manager";


export class WRMatterManager extends WRManager{
    matterChunk:WRMatterChunk[];
    constructor(){
        super("WRMatterManager")
        this.matterChunk = [];
    }
}

export class WRMatterChunk{

}