export class Vector3 {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    static get Zero() { return new Vector3(0, 0); }
    get magnitude() {
        return Math.sqrt(this.sqrMagnitude);
    }
    get sqrMagnitude() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
    get normalized() {
        return this.Copy().Divide(this.magnitude);
    }
    Copy() {
        return new Vector3(this.x, this.y, this.z);
    }
    Sum(vector) {
        if (vector instanceof Vector3) {
            return new Vector3(this.x + vector.x, this.y + vector.y, this.z + vector.z);
        }
        else if (vector instanceof Vector2) {
            return new Vector3(this.x + vector.x, this.y + vector.y, this.z);
        }
        return this.Copy();
    }
    Substract(vector) {
        if (vector instanceof Vector3) {
            return new Vector3(this.x - vector.x, this.y - vector.y, this.z - vector.z);
        }
        else if (vector instanceof Vector2) {
            return new Vector3(this.x - vector.x, this.y - vector.y, this.z);
        }
        return this.Copy();
    }
    Multiply(num) {
        return new Vector3(this.x * num, this.y * num, this.z * num);
    }
    Divide(num) {
        return new Vector3(this.x / num, this.y / num, this.z / num);
    }
    DotProduct(vec) {
        return new Vector3(this.x * vec.x, this.y * vec.y, this.z * vec.z);
    }
    DotDivision(vec) {
        return new Vector3(this.x / vec.x, this.y / vec.y, this.z / vec.z);
    }
    InvertY() {
        return new Vector3(this.x, -this.y, this.z);
    }
    InvertX() {
        return new Vector3(-this.x, this.y, this.z);
    }
    ToVector2() {
        return new Vector2(this.x, this.y);
    }
    ToString() {
        return this.toString();
    }
    toString() {
        return `(${this.x}, ${this.y}, ${this.z})`;
    }
}
export class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static get Zero() { return new Vector2(0, 0); }
    get magnitude() {
        return Math.sqrt(this.sqrMagnitude);
    }
    get sqrMagnitude() {
        return this.x * this.x + this.y * this.y;
    }
    get normalized() {
        return this.Copy().Divide(this.magnitude);
    }
    Copy() {
        return new Vector2(this.x, this.y);
    }
    Sum(vector) {
        if (vector instanceof Vector3) {
            return new Vector2(this.x + vector.x, this.y + vector.y);
        }
        else if (vector instanceof Vector2) {
            return new Vector2(this.x + vector.x, this.y + vector.y);
        }
        return this.Copy();
    }
    Substract(vector) {
        if (vector instanceof Vector3) {
            return new Vector2(this.x - vector.x, this.y - vector.y);
        }
        else if (vector instanceof Vector2) {
            return new Vector2(this.x - vector.x, this.y - vector.y);
        }
        return this.Copy();
    }
    Multiply(num) {
        return new Vector2(this.x * num, this.y * num);
    }
    Divide(num) {
        return new Vector2(this.x / num, this.y / num);
    }
    DotProduct(vec) {
        return new Vector2(this.x * vec.x, this.y * vec.y);
    }
    DotDivision(vec) {
        return new Vector2(this.x / vec.x, this.y / vec.y);
    }
    InvertY() {
        return new Vector2(this.x, -this.y);
    }
    InvertX() {
        return new Vector2(-this.x, this.y);
    }
    Rotate(angleDeg, origin) {
        const x = this.x - origin.x;
        const y = this.y - origin.y;
        const cos = Math.cos(angleDeg / 2 / Math.PI);
        const sin = Math.sin(angleDeg / 2 / Math.PI);
        let xPrime = (x * cos) - (y * sin);
        let yPrime = (x * sin) - (y * cos);
        xPrime += origin.x;
        yPrime += origin.y;
        return new Vector2(xPrime, yPrime);
    }
    ToVector3() {
        return new Vector3(this.x, this.y, 0);
    }
    ToString() {
        return this.toString();
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
}
