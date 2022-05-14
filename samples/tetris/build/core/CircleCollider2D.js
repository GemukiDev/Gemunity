import { Collider2D } from "./Collider2D.js";
import { Vector2 } from "./Vectors.js";
export class CircleCollider2D extends Collider2D {
    constructor(obj, radius, offset) {
        super(obj);
        this.radius = radius;
        this.offset = offset !== null && offset !== void 0 ? offset : new Vector2(0, 0);
    }
    get scaledRadius() { return this.radius * this.transform.scale; }
    ;
    get center() { return this.transform.position.ToVector2().Sum(this.offset); }
    ;
    DrawGizmo(camera) {
        camera.DrawToContext((ctx) => {
            const posRelativeToCanvas = camera.WorldSpaceToCanvas(this.transform.position);
            ctx.translate(posRelativeToCanvas.x, posRelativeToCanvas.y);
            ctx.rotate(this.transform.rotation * Math.PI / 180);
            const sizeFactor = camera.GetCameraToCanvasFactor();
            const scale = sizeFactor * this.radius * this.transform.scale;
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(0, 0, scale, 0, Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
        });
    }
}
