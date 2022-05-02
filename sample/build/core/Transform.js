import { Vector3 } from "./Vectors.js";
export class Transform {
    constructor(position, rotation, scale) {
        this.position = position !== null && position !== void 0 ? position : new Vector3(0, 0, 0);
        this.rotation = rotation !== null && rotation !== void 0 ? rotation : 0;
        this.scale = scale !== null && scale !== void 0 ? scale : 1;
    }
}
