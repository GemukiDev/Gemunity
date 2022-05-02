import { MonoBehaviour } from "../core/MonoBehaviour.js";
import { Time } from "../core/Time.js";
import { DinoController } from "./DinoController.js";
import { GameController } from "./GameController.js";
export class SueloInfinito extends MonoBehaviour {
    constructor(obj, size) {
        super(obj);
        this.vel = 0;
        this.pausado = false;
        this.size = size;
    }
    Awake() {
        DinoController.OnDinoGameOver.AddListener(this.Pausar, this);
        GameController.OnNewVelocity.AddListener(this.NewVelocity, this);
    }
    OnDestroy() {
        DinoController.OnDinoGameOver.RemoveListener(this.Pausar);
    }
    Update() {
        if (this.pausado)
            return;
        this.transform.position.x += this.vel * Time.deltaTime;
        if (this.transform.position.x < -25) {
            this.transform.position.x += 60;
        }
    }
    Pausar() {
        this.pausado = true;
    }
    NewVelocity(vel) {
        this.vel = vel;
    }
}
