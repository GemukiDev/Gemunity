import { EventEmitter } from "../core/EventEmiter.js";
import { MonoBehaviour } from "../core/MonoBehaviour.js";
import { Time } from "../core/Time.js";
export class GameController extends MonoBehaviour {
    constructor() {
        super(...arguments);
        this.deltaTime = 10;
        this.vel = -8;
    }
    Start() {
        GameController.OnNewVelocity.Invoke(this.vel);
    }
    Update() {
        this.deltaTime -= Time.deltaTime;
        if (this.deltaTime <= 0) {
            this.deltaTime = 10;
            this.vel -= 3;
            GameController.OnNewVelocity.Invoke(this.vel);
        }
    }
}
GameController.OnNewVelocity = new EventEmitter();
