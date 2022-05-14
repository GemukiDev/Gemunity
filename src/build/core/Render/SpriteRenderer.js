import { Color } from "./Color.js";
import { Renderer } from "./Renderer.js";
import { Vector2 } from "../Geometry/Vectors.js";
export class SpriteRenderer extends Renderer {
    constructor(gameObject, sprite, size, color = Color.White, orderInLayer = 0) {
        super(gameObject, orderInLayer);
        this.flipX = false;
        this.flipY = false;
        this.size = size;
        this.sprite = sprite;
        this.color = color;
    }
    get solidColor() { return this.color.ToSolid(); }
    ;
    get alpha() { return this.color.a; }
    ;
    get hasTint() { return !this.color.Equals(Color.White); }
    get flipedScale() {
        return new Vector2(this.flipX ? -this.transform.scale : this.transform.scale, this.flipY ? -this.transform.scale : this.transform.scale);
    }
    ;
    Awake() {
        if (this.hasTint) {
            this.buffer = document.createElement("canvas");
            this.buffer.width = this.sprite.image.width;
            this.buffer.height = this.sprite.image.height;
            this.bufferCtx = this.buffer.getContext("2d");
            this.bufferCtx.drawImage(this.sprite.image, 0, 0);
            this.bufferCtx.globalCompositeOperation = "multiply";
            this.bufferCtx.fillStyle = this.color.ToRGBString();
            this.bufferCtx.fillRect(0, 0, this.sprite.image.width, this.sprite.image.height);
            this.bufferCtx.globalCompositeOperation = "destination-in";
            this.bufferCtx.drawImage(this.sprite.image, 0, 0);
            this.bufferCtx.globalCompositeOperation = "source-over";
        }
    }
    DrawGizmo(camera) {
        camera.DrawToContext((ctx) => {
            if (!this.sprite || !this.sprite.image)
                return;
            this.ApplyTransform(camera, ctx);
            ctx.strokeStyle = 'green';
            ctx.fillStyle = 'green';
            ctx.beginPath();
            ctx.arc(0, 0, 3 / this.size.y, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.lineWidth = 2 / this.size.y;
            ctx.strokeRect(-this.sprite.width / 2, -this.sprite.height / 2, this.sprite.width, this.sprite.height);
        });
    }
    Draw(camera) {
        camera.DrawToContext((ctx) => {
            if (!this.sprite || !this.sprite.image)
                return;
            this.ApplyTransform(camera, ctx);
            ctx.globalAlpha = this.alpha; // * camera.GetOpacity(transform.position);
            ctx.drawImage(this.hasTint ? this.buffer : this.sprite.image, // the image
            this.sprite.offsetX, // left bound
            this.sprite.offsetY, // top bound
            this.sprite.width, // drawing width
            this.sprite.height, // drawing height
            -(this.sprite.width / 2), // subsprite left bound
            -(this.sprite.height / 2), // subsprite top bound
            this.sprite.width, // subsprite width
            this.sprite.height // subsprite height
            );
        });
    }
    ApplyTransform(camera, ctx) {
        const posRelativeToCanvas = camera.WorldSpaceToCanvas(this.transform.position);
        ctx.translate(posRelativeToCanvas.x, posRelativeToCanvas.y);
        ctx.rotate(this.transform.rotation * Math.PI / 180);
        const sizeFactor = camera.GetCameraToCanvasFactor();
        const scale = sizeFactor / this.sprite.height * this.size.y;
        ctx.scale(scale * this.flipedScale.x, scale * this.flipedScale.y);
    }
}
