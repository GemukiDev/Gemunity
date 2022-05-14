import { Color } from "./Color.js";
import { Renderer } from "./Renderer.js";
export class RectangleRenderer extends Renderer {
    constructor(gameObject, size, color = Color.White, orderInLayer = 0) {
        super(gameObject, orderInLayer);
        this.size = size;
        this.color = color;
    }
    DrawGizmo(camera) {
        camera.DrawToContext((ctx) => {
            this.ApplyTransform(camera, ctx);
            ctx.globalAlpha = 1;
            ctx.strokeStyle = 'pink';
            ctx.fillStyle = 'pink';
            ctx.beginPath();
            ctx.arc(0, 0, 3 / this.size.y, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.lineWidth = 2 / this.size.y;
            const sizeFactor = camera.GetCameraToCanvasFactor();
            ctx.strokeRect(-this.size.x / 2 * sizeFactor, -this.size.y / 2 * sizeFactor, this.size.x * sizeFactor, this.size.y * sizeFactor);
        });
    }
    Draw(camera) {
        camera.DrawToContext((ctx) => {
            this.ApplyTransform(camera, ctx);
            ctx.globalAlpha = this.color.a; // * camera.GetOpacity(transform.position);
            ctx.fillStyle = this.color.ToSolid().ToRGBString();
            const sizeFactor = camera.GetCameraToCanvasFactor();
            ctx.fillRect(-this.size.x / 2 * sizeFactor, -this.size.y / 2 * sizeFactor, this.size.x * sizeFactor, this.size.y * sizeFactor);
        });
    }
    ApplyTransform(camera, ctx) {
        const posRelativeToCanvas = camera.WorldSpaceToCanvas(this.transform.position);
        ctx.translate(posRelativeToCanvas.x, posRelativeToCanvas.y);
        ctx.rotate(this.transform.rotation * Math.PI / 180);
        ctx.scale(this.transform.scale, this.transform.scale);
    }
}
