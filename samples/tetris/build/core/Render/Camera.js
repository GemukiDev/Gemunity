import { MonoBehaviour } from "../MonoBehaviour.js";
import { Vector2 } from "../Gemunity.js";
export class Camera extends MonoBehaviour {
    constructor(gameObject, canvasId, color, size) {
        super(gameObject);
        this.canvas = null;
        this.ctx = null;
        this.color = color;
        this.size = size;
        this.canvas = document.getElementById(canvasId);
        if (this.canvas)
            this.ctx = this.canvas.getContext("2d");
        window.addEventListener("resize", this.ResizeCanvas.bind(this));
        this.ResizeCanvas();
    }
    get canvasWidth() { var _a, _b; return (_b = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.clientWidth) !== null && _b !== void 0 ? _b : 0; }
    ;
    get canvasHeight() { var _a, _b; return (_b = (_a = this.canvas) === null || _a === void 0 ? void 0 : _a.clientHeight) !== null && _b !== void 0 ? _b : 0; }
    ;
    ClearCanvas() {
        if (!this.canvas || !this.ctx)
            return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    ResizeCanvas() {
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
    }
    Draw() {
        if (!this.canvas || !this.ctx)
            return;
        this.ctx.fillStyle = this.color.ToRGBString();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    DrawToContext(action) {
        if (!this.canvas || !this.ctx)
            return;
        this.ctx.save();
        action(this.ctx);
        this.ctx.restore();
    }
    DrawPoint(point, radius = 2, color = null) {
        const canvasPoint = this.WorldSpaceToCanvas(point);
        this.ctx.save();
        this.ctx.fillStyle = color ? color.ToRGBString() : "blue";
        this.ctx.beginPath();
        this.ctx.arc(canvasPoint.x, canvasPoint.y, radius, 0, 6);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }
    GetCanvasDimensions() {
        return new Vector2(this.canvasWidth, this.canvasHeight);
    }
    GetCameraToCanvasFactor() {
        return this.canvas.height / 2 / this.size;
    }
    WorldSpaceToCanvas(point) {
        const posRelativeToCam = point.Substract(this.transform.position);
        const posRelativeToCanvasCenter = posRelativeToCam.Multiply(this.canvasHeight / 2 / this.size).ToVector2();
        const posOnCanvasInvertedY = posRelativeToCanvasCenter.Sum(this.GetCanvasDimensions().Divide(2));
        posOnCanvasInvertedY.y = this.canvas.height - posOnCanvasInvertedY.y;
        return posOnCanvasInvertedY;
    }
    CanvasToWorldSpace2D(point) {
        const posRelativeToCanvasCenter = point.Substract(this.GetCanvasDimensions().Divide(2));
        const posRelativeToCamera = posRelativeToCanvasCenter.Divide(this.canvasHeight / 2 / this.size);
        return posRelativeToCamera.Substract(this.transform.position).InvertY();
    }
}
Camera.main = null;
