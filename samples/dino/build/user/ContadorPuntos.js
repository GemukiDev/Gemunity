import { MonoBehaviour, TextRenderer } from "../core/Gemunity.js";
import { CactusController } from "./CactusController.js";
export class ContadorPuntos extends MonoBehaviour {
    constructor() {
        super(...arguments);
        this.puntos = 0;
    }
    Awake() {
        this.textRenderer = this.GetComponent(TextRenderer);
        CactusController.OnCollect.AddListener(this.CactusCollect, this);
    }
    OnDestroy() {
        CactusController.OnCollect.RemoveListener(this.CactusCollect);
    }
    CactusCollect() {
        this.puntos++;
        this.textRenderer.text = "PUNTOS: " + this.puntos;
    }
}
