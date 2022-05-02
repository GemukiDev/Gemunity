import { Color, GameObject, SpriteRenderer, Transform } from "../core/Gemunity.js";
import { List } from "../core/List.js";
import { MonoBehaviour } from "../core/MonoBehaviour.js";
import { Random } from "../core/Random.js";
import { Resources } from "../core/Resources.js";
import { Time } from "../core/Time.js";
import { Vector2, Vector3 } from "../core/Vectors.js";
import { DinoController } from "./DinoController.js";
import { GameController } from "./GameController.js";
export class CloudGenerator extends MonoBehaviour {
    constructor() {
        super(...arguments);
        this.minTime = 0.2;
        this.maxTime = 1;
        this.cloudList = new List();
        this.vel = 0;
        this.pausado = false;
    }
    Awake() {
        DinoController.OnDinoGameOver.AddListener(this.Pausar, this);
        GameController.OnNewVelocity.AddListener(this.NewVelocity, this);
    }
    OnDestroy() {
        DinoController.OnDinoGameOver.RemoveListener(this.Pausar);
        GameController.OnNewVelocity.RemoveListener(this.NewVelocity);
    }
    Start() {
        this.deltaTime = Random.Range(this.minTime, this.maxTime);
    }
    Update() {
        if (this.pausado)
            return;
        this.deltaTime -= Time.deltaTime;
        this.cloudList.forEach(cactus => {
            cactus.transform.position.x += this.vel * Time.deltaTime;
            if (cactus.transform.position.x < -10) {
                GameObject.Destroy(cactus);
            }
        });
        if (this.deltaTime <= 0) {
            this.GenerarNube();
        }
    }
    GenerarNube() {
        this.deltaTime = Random.Range(this.minTime, this.maxTime);
        const randY = Random.Range(1, 4);
        this.cloudList.Add(GameObject.Instantiate(new GameObject("nube", new Transform(new Vector3(10, randY)), (obj) => [
            new SpriteRenderer(obj, Resources.GetSprite("nube"), new Vector2(0.5, 0.5), Color.White, -1),
        ])));
    }
    Pausar() {
        this.pausado = true;
    }
    NewVelocity(vel) {
        this.vel = vel;
    }
}
