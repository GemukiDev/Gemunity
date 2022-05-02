export class Collision2DManifold {
    constructor(normal, depth) {
        this.isColliding = false;
        this.normal = normal;
        this.contactPoints = [];
        this.depth = depth;
    }
    static get None() { return new Collision2DManifold(); }
    AddContactPoint(point) {
        this.contactPoints.push(point);
    }
}
