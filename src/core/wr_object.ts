import { WRVector } from "../math/wr_vector";
import { WRNoun } from "./wr_noun";

export class WRSubstance extends WRNoun {
  mass: number;
  weight: number;
  constructor(mass: number = 0, weight: number = 0, name = "") {
    super(name);
    this.mass = mass;
    this.weight = weight;
  }
}

// すべての個体
export class WRObject extends WRSubstance {
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
    super(mass, weight, name);
    this.size = size;
    this.position = position;
    this.rotation = rotation;
  }
}

export class WRLiquid extends WRSubstance {
    position: WRPosition;
    constructor(
      position = new WRPosition(),
      mass = 0,
      weight = 0,
      name = ""
    ) {
      super(mass, weight, name);
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

export class WRContainer extends WRObject {
  contents: WRSubstance[];

  massCapacity: number;
  massFill:number;
  weightCapacity: number;
  weightFill:number;
  constructor(
    massCapacity: number = 0,
    weightCapacity:number = 0,
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
  }

  in(object: WRSubstance):boolean{
    if(object.mass + this.massFill > this.massCapacity){
        return false;
    }
    if(object.weight + this.weightFill > this.weightCapacity){
        return false;
    }
    this.weightFill += object.weight;
    this.massFill += object.mass;
    this.contents.push(object)
    return true;
  }
  out(index:number): boolean{
    if(this.contents.length <= index){
        return false;
    }
    this.contents.
  }
}
