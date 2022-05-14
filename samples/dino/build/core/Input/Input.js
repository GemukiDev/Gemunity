import { Vector2 } from "../Geometry/Vectors.js";
export class Input {
    static get mousePosition() { return new Vector2(this._mousePosition.x, this._mousePosition.y); }
    ;
    static GetKey(keyCode) {
        return this.keysPressed.includes(keyCode);
    }
    static GetKeyUp(keyCode) {
        return this.keysUp.includes(keyCode);
    }
    static GetKeyDown(keyCode) {
        return this.keysDown.includes(keyCode);
    }
    static GetMouseButton(buttonNumber) {
        return this.mousePressed.includes(buttonNumber);
    }
    static GetMouseButtonUp(buttonNumber) {
        return this.mouseUp.includes(buttonNumber);
    }
    static GetMouseButtonDown(buttonNumber) {
        return this.mouseDown.includes(buttonNumber);
    }
    static _OnKeyDown(e) {
        const key = this.Transform(e.code);
        console.log(key);
        if (!this.keysDown.includes(key) && !this.keysDownMemo.includes(key))
            this.keysDown.push(key);
        if (!this.keysDownMemo.includes(key))
            this.keysDownMemo.push(key);
        if (!this.keysPressed.includes(key))
            this.keysPressed.push(key);
    }
    static _OnKeyUp(e) {
        const key = this.Transform(e.code);
        if (!this.keysUp.includes(key))
            this.keysUp.push(key);
        this.keysDownMemo = this.keysDownMemo.filter(k => k != key);
        this.keysDown = this.keysDown.filter(k => k != key);
        this.keysPressed = this.keysPressed.filter(k => k != key);
    }
    static _OnMouseDown(e) {
        if (!this.mouseDown.includes(e.button))
            this.mouseDown.push(e.button);
        if (!this.mousePressed.includes(e.button))
            this.mousePressed.push(e.button);
    }
    static _OnMouseUp(e) {
        if (!this.mouseUp.includes(e.button))
            this.mouseUp.push(e.button);
        this.mouseDown = this.mouseDown.filter(k => k != e.button);
        this.mousePressed = this.mousePressed.filter(k => k != e.button);
    }
    static _OnMouseMove(e) {
        this._mousePosition.x = e.pageX;
        this._mousePosition.y = e.pageY;
    }
    static Transform(code) {
        if (code == "ShiftLeft")
            return "Shift";
        else if (code == "ShiftRight")
            return "Shift";
        else if (code == "ControlLeft")
            return "Control";
        else if (code == "ControlRight")
            return "Control";
        else
            return code;
    }
    static Init() {
        document.addEventListener("keydown", Input._OnKeyDown.bind(this));
        document.addEventListener("keyup", Input._OnKeyUp.bind(this));
        document.addEventListener("mousedown", Input._OnMouseDown.bind(this));
        document.addEventListener("mouseup", Input._OnMouseUp.bind(this));
        document.addEventListener("mousemove", Input._OnMouseMove.bind(this));
        document.addEventListener("contextmenu", (e) => e.preventDefault());
    }
    static Tick() {
        this.keysDown.length = 0;
        this.keysUp.length = 0;
        this.mouseDown.length = 0;
        this.mouseUp.length = 0;
    }
}
Input.keysDownMemo = [];
Input.keysDown = [];
Input.keysPressed = [];
Input.keysUp = [];
Input.mouseDown = [];
Input.mousePressed = [];
Input.mouseUp = [];
Input._mousePosition = new Vector2(0, 0);
