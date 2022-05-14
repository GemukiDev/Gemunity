import { TextRenderer } from "../core/Gemunity.js";
import { MonoBehaviour } from "../core/MonoBehaviour.js";
import { Escenario } from "./Escenario.js";
export class Puntuacion extends MonoBehaviour {
    constructor() {
        super(...arguments);
        this.puntos = 0;
    }
    Awake() {
        this.textRenderer = this.GetComponent(TextRenderer);
        Escenario.OnLineaEliminada.AddListener(this.GanarPuntos, this);
    }
    Start() {
        this.RefrescarTexto();
    }
    OnDestroy() {
        Escenario.OnLineaEliminada.RemoveListener(this.GanarPuntos);
    }
    GanarPuntos(puntos) {
        this.puntos += puntos;
        this.RefrescarTexto();
    }
    RefrescarTexto() {
        this.textRenderer.text = "Puntos:\n" + this.puntos;
    }
}
