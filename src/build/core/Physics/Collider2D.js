import { MonoBehaviour } from "../MonoBehaviour.js";
export class Collider2D extends MonoBehaviour {
    constructor(obj) {
        super(obj);
        this.contacts = [];
    }
}
