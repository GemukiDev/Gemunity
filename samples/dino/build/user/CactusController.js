import { MonoBehaviour, AudioSource, Resources, EventEmitter } from "../core/Gemunity.js";
export class CactusController extends MonoBehaviour {
    constructor() {
        super(...arguments);
        this.collected = false;
    }
    Update() {
        if (!this.collected && this.transform.position.x < -4.5) {
            this.Collect();
        }
    }
    Collect() {
        this.collected = true;
        AudioSource.PlayOneShot(Resources.GetAudio("moneda"));
        CactusController.OnCollect.Invoke();
    }
}
CactusController.OnCollect = new EventEmitter();
