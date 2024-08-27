
export type RuleType = "break" | "blend" | "burn" | "cold"

export class WRRule{
    ruleType:RuleType

    constructor(ruleType: RuleType){
        this.ruleType = ruleType;
    }

    static readFromRuleListJsonText(jsonText: string){
        return JSON.parse(jsonText);
    }
}

export class WRBlendRule extends WRRule{
    
}