import { Media } from "./Media.js";
export class Sprite extends Media {
    constructor(name, src, offsetX = 0, offsetY = 0, width = null, height = null) {
        super(name, src);
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        this._width = width;
        this._height = height;
    }
    get image() { return this._image; }
    ;
    get offsetX() { return this._offsetX; }
    ;
    get offsetY() { return this._offsetY; }
    ;
    get width() { var _a; return (_a = this._width) !== null && _a !== void 0 ? _a : 0; }
    ;
    get height() { var _a; return (_a = this._height) !== null && _a !== void 0 ? _a : 0; }
    ;
    SetMedia(elem) {
        this._image = elem;
        if (this._offsetX > this.image.width)
            this._offsetX = 0;
        if (this._offsetY > this.image.width)
            this._offsetY = 0;
        if (this._width == null)
            this._width = this.image.width;
        if (this._height == null)
            this._height = this.image.height;
        if (this._offsetX + this._width > this.image.width)
            this._width = this.image.width - this._offsetX;
        if (this._offsetY + this._height > this.image.height)
            this._height = this.image.height - this._offsetY;
    }
}
