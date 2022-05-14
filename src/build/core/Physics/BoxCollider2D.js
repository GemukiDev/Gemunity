import { Bounds } from "./Bounds.js";
import { Collider2D } from "./Collider2D.js";
import { Vector2 } from "../Geometry/Vectors.js";
export class BoxCollider2D extends Collider2D {
    constructor(obj, size, offset = null) {
        super(obj);
        this.size = size;
        this.offset = offset !== null && offset !== void 0 ? offset : new Vector2(0, 0);
    }
    get center() { return this.transform.position.ToVector2().Sum(this.offset); }
    ;
    get scaledSize() { return this.size.Multiply(this.transform.scale); }
    ;
    GetBounds() {
        const center = this.center;
        const size = this.scaledSize;
        return new Bounds(center.y + size.y / 2, center.y - size.y / 2, center.x - size.x / 2, center.x + size.x / 2);
    }
    DrawGizmo(camera) {
        camera.DrawToContext((ctx) => {
            const posRelativeToCanvas = camera.WorldSpaceToCanvas(this.transform.position);
            ctx.translate(posRelativeToCanvas.x, posRelativeToCanvas.y);
            ctx.rotate(this.transform.rotation * Math.PI / 180);
            const sizeFactor = camera.GetCameraToCanvasFactor();
            const scale = this.size.Multiply(this.transform.scale * sizeFactor);
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 1;
            ctx.strokeRect(-scale.x / 2, -scale.y / 2, scale.x, scale.y);
        });
    }
}
