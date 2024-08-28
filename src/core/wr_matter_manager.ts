// This class manage all of matter.

import { WRCatalog } from "./wr_catalog";
import { WRFactory, WRManager } from "./wr_manager";
import { WRLiquid, WRMatter, WRObject } from "./wr_matter";

export class WRMatterManager extends WRManager {
    // singleton
    private static _instance : WRMatterManager;
    
    private constructor() {
        super("WRMatterManager");
        this.matterChunk = [];
        this.catalog = new WRMatterCatalog()
    }
    static instance(){
        if(!this.instance){
            WRMatterManager._instance = new WRMatterManager();
        }
        return this._instance;
    }

    // props
    matterChunk: WRMatterChunk[];
    catalog: WRMatterCatalog;
    factory: WRMatterFactory;

    
}

export class WRMatterChunk {}

export class WRMatterFactory extends WRFactory<WRMatter> {
    create(): WRMatter {
        throw new Error("Method not implemented.");
    }
    constructor() {
        super("WRMatterFactory");
    }
}

export class WRMatterCatalog extends WRCatalog<WRMatter>{
    protected read(item: WRMatter): WRMatter {
        switch(item.state){
            case "solid":
                return item as WRObject;
            case "liquid":
                return item as WRLiquid;
            case "air":
                // TODO:item
                return item;
        }
    }
    
    constructor(path: string){
        super("WRMatterCatalog", path);
    }
}
