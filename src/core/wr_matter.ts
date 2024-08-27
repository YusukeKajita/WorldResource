import { WRVector } from "../math/wr_vector";
import { WRNoun } from "./wr_noun";

export type StateOfMatter = "solid" | "liquid" | "air";
// すべての物体
export class WRMatter extends WRNoun {
  mass: number;
  state: StateOfMatter;
  constructor(
    mass: number = 0,
    name = "",
    state: StateOfMatter
  ) {
    super(name);
    this.mass = mass;
    this.state = state;
  }
}

// すべての個体
export class WRObject extends WRMatter {
  size: WRVector;
  position: WRPosition;
  rotation: WRRotation;
  constructor(
    size = new WRVector(),
    position = new WRPosition(),
    rotation = new WRRotation(),
    mass = 0,
    name = ""
  ) {
    super(mass, name, "solid");
    this.size = size;
    this.position = position;
    this.rotation = rotation;
  }
}

// すべての液体
export class WRLiquid extends WRMatter {
  
  position: WRPosition;
  constructor(position = new WRPosition(), mass = 0, name = "") {
    super(mass, name, "liquid");
    this.position = position;
  }

}

export class WRRotation {
  normalizedVector: WRVector;
  constructor(normalizedVector: WRVector = new WRVector()) {
    this.normalizedVector = normalizedVector;
  }
}

export class WRPosition {
  vector: WRVector;
  constructor(vector: WRVector = new WRVector()) {
    this.vector = vector;
  }
}

// コンテナ
export class WRContainer extends WRObject {
  // 内容物
  contents: WRMatter[];

  // 許容体積
  massCapacity: number;
  // 現在体積
  massFill: number;

  // 液体が入っているか
  isLiquidfilled: boolean;

  constructor(
    massCapacity: number = 0,
    size = new WRVector(),
    position = new WRPosition(),
    rotation = new WRRotation(),
    mass = 0,
    name = ""
  ) {
    super(size, position, rotation, mass, name);
    this.massCapacity = massCapacity;
    this.contents = [];
    this.massFill = 0;
    this.isLiquidfilled = false;
  }

  in(matter: WRMatter): boolean {
    if (matter.mass + this.massFill > this.massCapacity) {
      return false;
    }
    this.massFill += matter.mass;
    this.contents.push(matter);
    if (matter.state == "liquid") {
      if (this.isLiquidfilled) {
        // TODO:液体がすでに入っていた場合
      } else {
        this.isLiquidfilled = true;
      }
    }
    return true;
  }
  out(index: number, mass:number | undefined): WRMatter | undefined {
    let content: WRMatter | undefined = this.contents.at(index);
    if (content) {
      switch(content.state){
        case "solid":
          this.contents.splice(index, 1);
          return content;
        case "liquid":
          // 取り出し指定
          const liquidContent = content as WRLiquid;
          if(mass && mass > 0 && liquidContent.mass < mass){
            liquidContent.mass -= mass;
            return new WRLiquid(liquidContent.position, mass, liquidContent.name);
          }
          // 指定なしまたは全だし
          
          this.contents.splice(index, 1);
          return content;
        
        case "air":
          // TODO:air define
      }
    }
    return content;
  }
}
