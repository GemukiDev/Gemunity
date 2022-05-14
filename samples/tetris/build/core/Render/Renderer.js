import { MonoBehaviour } from "../MonoBehaviour.js";
export class Renderer extends MonoBehaviour {
    constructor(obj, orderInLayer) {
        super(obj);
        this.orderInLayer = orderInLayer;
    }
}
