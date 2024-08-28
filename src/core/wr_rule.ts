import { WRMatter, WRObject } from "./wr_matter";
import { WRNoun } from "./wr_noun";

export type RuleType = "break" | "blend" | "heat" | "cool";

export class WRRule extends WRNoun {
    ruleType: RuleType;
    rowList: IMatterRatio[];
    resultList: IMatterRatio[];

    constructor(ruleType: RuleType, ruleName: string) {
        super(ruleName);
        this.ruleType = ruleType;
        this.rowList = [];
        this.resultList = [];
    }
    affect(matterList: WRMatter[]) {
        const maxUseMatter = this.rowList.find((v) => {
            const calcMatter = matterList.find((v1) => {
                return v1.name == v.name;
            });
            if (!calcMatter) return;
            const calcRate = calcMatter.mass / v.ratio;
            let result = true;
            this.rowList.forEach((v1) => {
                const targetMatter = matterList.find((v2) => {
                    return v2.name == v1.name;
                });
                // 材料なし or 足りない
                if (!targetMatter || targetMatter.mass < v1.ratio * calcRate) result = false;
            });
            return result;
        });

        if (!maxUseMatter) {
            // 何も起きない
            return;
        }

        const calcMatter = matterList.find((v1) => {
            return v1.name == maxUseMatter.name;
        });
        if (!calcMatter) return;
        const calcRate = calcMatter.mass / maxUseMatter.ratio;
        this.rowList.forEach((v1) => {
            const targetMatter = matterList.find((v2) => {
                return v2.name == v1.name;
            });
            if (!targetMatter) return;
            targetMatter.mass -= v1.ratio * calcRate;
        });

        const index = matterList.findIndex((v1) => {
            return v1.name == maxUseMatter.name;
        });

        matterList.splice(index);
        matterList.push(
            this.resultList.map((v) => {
                return new WRObject();
            })
        );
        return;
    }

    readFrom(json: string): void {
        const jsonObject: WRRule = JSON.parse(json);
        this.rowList.push(...jsonObject.rowList);
        this.resultList.push(...jsonObject.resultList);
    }
}

interface IMatterRatio {
    name: string;
    ratio: number;
}
