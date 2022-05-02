export class Color {
    constructor(r, g, b, a) {
        this.r = Math.min(r !== null && r !== void 0 ? r : 1, 1);
        this.g = Math.min(g !== null && g !== void 0 ? g : 1, 1);
        this.b = Math.min(b !== null && b !== void 0 ? b : 1, 1);
        this.a = Math.min(a !== null && a !== void 0 ? a : 1, 1);
    }
    static get Black() { return new Color(0, 0, 0, 1); }
    ;
    static get White() { return new Color(1, 1, 1, 1); }
    ;
    static get Red() { return new Color(1, 0, 0, 1); }
    ;
    static get Blue() { return new Color(0, 0, 1, 1); }
    ;
    static get Green() { return new Color(0, 1, 0, 1); }
    ;
    static get Yellow() { return new Color(1, 1, 0, 1); }
    ;
    static get Magenta() { return new Color(1, 0, 1, 1); }
    ;
    static get Cyan() { return new Color(0, 1, 1, 1); }
    ;
    ToRGBString() {
        return `rgb(${Math.floor(this.r * 256)}, ${Math.floor(this.g * 256)}, ${Math.floor(this.b * 256)}, ${Math.floor(this.a * 256)})`;
    }
    ToSolid() {
        return new Color(this.r, this.g, this.b, 1);
    }
    Equals(otherColor) {
        return this.r == otherColor.r
            && this.g == otherColor.g
            && this.b == otherColor.b
            && this.a == otherColor.a;
    }
}
