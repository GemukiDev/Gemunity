export class Bounds {
    constructor(top, bottom, left, right) {
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right;
    }
    get width() { return this.right - this.left; }
    ;
    get height() { return this.top - this.bottom; }
    ;
    Copy() {
        return new Bounds(this.top, this.bottom, this.left, this.right);
    }
    Merge(otherBound) {
        const copy = this.Copy();
        copy.Envelop(otherBound);
        return copy;
    }
    Envelop(otherBound) {
        this.left = Math.min(this.left, otherBound.left);
        this.right = Math.max(this.right, otherBound.right);
        this.bottom = Math.min(this.bottom, otherBound.bottom);
        this.top = Math.max(this.top, otherBound.top);
    }
    CollidesWith(otherBound) {
        return this.left < otherBound.right &&
            this.right > otherBound.left &&
            this.top > otherBound.bottom &&
            this.bottom < otherBound.top;
    }
}
