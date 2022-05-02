import { Color } from "./Color.js";
import { Config } from "./Config.js";
import { Renderer } from "./Renderer.js";
import { Vector2 } from "./Vectors.js";
export var FontWeight;
(function (FontWeight) {
    FontWeight["Normal"] = "normal";
    FontWeight["Bold"] = "bold";
    FontWeight["Bolder"] = "bolder";
    FontWeight["Lighter"] = "lighter";
})(FontWeight || (FontWeight = {}));
export var FontStyle;
(function (FontStyle) {
    FontStyle["Normal"] = "normal";
    FontStyle["Italic"] = "italic";
    FontStyle["Oblique"] = "oblique";
})(FontStyle || (FontStyle = {}));
export var TextAlign;
(function (TextAlign) {
    TextAlign["Left"] = "left";
    TextAlign["Center"] = "center";
    TextAlign["Right"] = "right";
})(TextAlign || (TextAlign = {}));
export var TextWrap;
(function (TextWrap) {
    TextWrap["Overflow"] = "overflow";
    TextWrap["Shrink"] = "shrink";
    TextWrap["Wrap"] = "wrap";
    TextWrap["Fit"] = "fit";
})(TextWrap || (TextWrap = {}));
export class TextRenderer extends Renderer {
    constructor(obj, text, size, color, fontSize = 16, fontFamily = "Arial", textAlign = TextAlign.Center, fontWeight = FontWeight.Normal, fontStyle = FontStyle.Normal, wrapping = TextWrap.Fit, lineHeight = 1, orderInLayer = 0) {
        super(obj, orderInLayer);
        this.text = text;
        this.size = size;
        this.color = color;
        this.fontSize = fontSize;
        this.fontFamily = fontFamily;
        this.fontWeight = fontWeight;
        this.textAlign = textAlign;
        this.fontStyle = fontStyle;
        this.wrapping = wrapping;
        this.lineHeight = lineHeight;
    }
    DrawGizmo(camera) {
        const posRelativeToCanvas = camera.WorldSpaceToCanvas(this.transform.position);
        const sizeFactor = camera.GetCameraToCanvasFactor();
        const scaledSize = this.size.Multiply(this.transform.scale * sizeFactor);
        const offsetFactor = this.GetCenterOffset();
        camera.DrawToContext((ctx) => {
            ctx.translate(posRelativeToCanvas.x, posRelativeToCanvas.y);
            ctx.rotate(this.transform.rotation * Math.PI / 180);
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 1;
            ctx.strokeRect(scaledSize.x * offsetFactor.x, scaledSize.y * offsetFactor.y, scaledSize.x, scaledSize.y);
        });
        camera.DrawPoint(this.transform.position, 4, Color.Blue);
    }
    Draw(camera) {
        camera.DrawToContext((ctx) => {
            const posRelativeToCanvas = camera.WorldSpaceToCanvas(this.transform.position);
            ctx.translate(posRelativeToCanvas.x, posRelativeToCanvas.y);
            ctx.rotate(this.transform.rotation * Math.PI / 180);
            const sizeFactor = camera.GetCameraToCanvasFactor();
            const scaledSize = this.size.Multiply(this.transform.scale * sizeFactor);
            const offsetFactor = this.GetCenterOffset();
            const pixels = this.GetFontSize(sizeFactor, ctx);
            ctx.font = `${this.fontStyle} ${this.fontWeight} ${pixels}px ${this.fontFamily}`;
            ctx.textAlign = this.textAlign;
            ctx.textBaseline = "top";
            ctx.fillStyle = this.color.ToRGBString();
            const wrappedText = this.GetWrappedText(scaledSize.x, ctx);
            wrappedText.forEach((v, i) => {
                if (this.wrapping == TextWrap.Shrink) {
                    ctx.fillText(v, 0, -scaledSize.y / 2 + this.lineHeight * pixels * i, scaledSize.x);
                }
                else {
                    ctx.fillText(v, 0, -scaledSize.y / 2 + this.lineHeight * pixels * i);
                }
            });
        });
    }
    GetFontSize(sizeFactor, ctx) {
        let pixels = Math.round(this.fontSize / Config.fontGlobalScale * sizeFactor);
        if (this.wrapping == TextWrap.Fit) {
            const lines = this.GetWrappedText(this.size.x * this.transform.scale * sizeFactor, ctx);
            lines.forEach(line => {
                ctx.font = `${this.fontStyle} ${this.fontWeight} ${pixels}px ${this.fontFamily}`;
                let medida = ctx.measureText(line);
                pixels = Math.min(pixels, pixels * this.size.x * sizeFactor / medida.width);
            });
        }
        return pixels;
    }
    GetWrappedText(maxLineWidth, ctx) {
        if (this.cacheBlueprint == this.GetCacheBlueprint() && this.cachedWrappedText)
            return this.cachedWrappedText;
        const lines = this.text.split("\n");
        if (this.wrapping == TextWrap.Wrap) {
            const wrappedLines = [];
            let words;
            let word;
            lines.forEach(line => {
                words = line.trim().split(" ").filter(w => w != "").reverse();
                if (words.length)
                    wrappedLines.push(words.pop());
                for (let i = words.length - 1; i >= 0; i--) {
                    word = words[i];
                    if (ctx.measureText(wrappedLines[wrappedLines.length - 1] + " " + word).width < maxLineWidth) {
                        wrappedLines[wrappedLines.length - 1] += " " + word;
                    }
                    else {
                        if (words.length)
                            wrappedLines.push(word);
                    }
                }
                ;
            });
            this.cachedWrappedText = wrappedLines;
        }
        else {
            this.cachedWrappedText = lines;
        }
        this.cacheBlueprint = this.GetCacheBlueprint();
        return this.cachedWrappedText;
    }
    GetCacheBlueprint() {
        return `${this.text}-${this.size.x}-${this.size.y}-${this.fontSize}-${this.fontFamily}-${this.fontStyle}-${this.fontWeight}`;
    }
    GetCenterOffset() {
        switch (this.textAlign) {
            case TextAlign.Center:
            default:
                return new Vector2(-0.5, -0.5);
            case TextAlign.Left:
                return new Vector2(0, -0.5);
            case TextAlign.Right:
                return new Vector2(-1, -0.5);
        }
    }
}
