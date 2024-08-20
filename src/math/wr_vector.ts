

export class WRVector {
    x: number;
    y: number;
    z: number;
    constructor(x: number = 0, y: number= 0, z: number= 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    length() {
        return Math.pow(this.x * this.x + this.y * this.y + this.z * this.z, 0.5)
    }
    normalize() {
        const length = this.length()
        this.x = this.x / length;
        this.y = this.y / length;
        this.z = this.z / length;
        return this;
    }
    clone(){
        return new WRVector(this.x, this.y, this.z);
    }

    normalized(){
        return this.clone().normalize();
    }
}

