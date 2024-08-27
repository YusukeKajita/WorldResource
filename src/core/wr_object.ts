import { WRVector } from "../math/wr_vector";
import { WRNoun } from "./wr_noun";

export type StateOfMatter = "solid" | "liquid" | "air";
// すべての物体
export class WRMatter extends WRNoun {
  mass: number;
  weight: number;
  state: StateOfMatter;
  constructor(
    mass: number = 0,
    weight: number = 0,
    name = "",
    state: StateOfMatter
  ) {
    super(name);
    this.mass = mass;
    this.weight = weight;
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
    weight = 0,
    name = ""
  ) {
    super(mass, weight, name, "solid");
    this.size = size;
    this.position = position;
    this.rotation = rotation;
  }
}

// すべての液体
export class WRLiquid extends WRMatter {
  
  position: WRPosition;
  constructor(position = new WRPosition(), mass = 0, weight = 0, name = "") {
    super(mass, weight, name, "liquid");
    this.position = position;
  }

  

  // 何かを入れてまぜる
  blend(matter: WRMatter): WRMatter {
    // 同じものの場合増えるだけ
    if(this.name == matter.name){
      return new WRLiquid(this.position, this.mass + matter.mass, this.weight + matter.weight, this.name);
    }

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

  // 許容重量
  weightCapacity: number;
  // 現在重量
  weightFill: number;

  // 液体が入っているか
  isLiquidfilled: boolean;

  constructor(
    massCapacity: number = 0,
    weightCapacity: number = 0,
    size = new WRVector(),
    position = new WRPosition(),
    rotation = new WRRotation(),
    mass = 0,
    weight = 0,
    name = ""
  ) {
    super(size, position, rotation, mass, weight, name);
    this.weightCapacity = weightCapacity;
    this.massCapacity = massCapacity;
    this.contents = [];
    this.weightFill = 0;
    this.massFill = 0;
    this.isLiquidfilled = false;
  }

  in(matter: WRMatter): boolean {
    if (matter.mass + this.massFill > this.massCapacity) {
      return false;
    }
    if (matter.weight + this.weightFill > this.weightCapacity) {
      return false;
    }
    this.weightFill += matter.weight;
    this.massFill += matter.mass;
    this.contents.push(matter);
    if (matter.state == "liquid") {
      if (this.isLiquidfilled) {
      } else {
        this.isLiquidfilled = true;
      }
    }
    return true;
  }
  out(index: number): WRMatter | undefined {
    let content: WRMatter | undefined = this.contents.at(index);
    if (content) {
      this.contents.splice(index, 1);
    }
    return content;
  }
}
