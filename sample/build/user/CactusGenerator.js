import { BoxCollider2D } from "../core/BoxCollider2D.js";
import { GameObject, SpriteRenderer, Transform } from "../core/Gemunity.js";
import { List } from "../core/List.js";
import { MonoBehaviour } from "../core/MonoBehaviour.js";
import { Random } from "../core/Random.js";
import { Resources } from "../core/Resources.js";
import { Time } from "../core/Time.js";
import { Vector2, Vector3 } from "../core/Vectors.js";
import { DinoController } from "./DinoController.js";
import { CactusController } from "./CactusController.js";
import { GameController } from "./GameController.js";
export class CactusGenerator extends MonoBehaviour {
    constructor() {
        super(...arguments);
        this.minTime = 0.5;
        this.maxTime = 1.5;
        this.cactusList = new List();
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
        this.cactusList.forEach(cactus => {
            cactus.transform.position.x += this.vel * Time.deltaTime;
            if (cactus.transform.position.x < -10) {
                GameObject.Destroy(cactus);
            }
        });
        if (this.deltaTime <= 0) {
            this.GenerarCactus();
        }
    }
    GenerarCactus() {
        this.deltaTime = Random.Range(this.minTime, this.maxTime);
        this.cactusList.Add(GameObject.Instantiate(this.GetRandomCactus()));
    }
    GetRandomCactus() {
        const rand = Random.RangeInt(0, 2);
        if (rand == 0) {
            return new GameObject("cactus", new Transform(new Vector3(10, -0.1)), (obj) => [
                new CactusController(obj),
                new SpriteRenderer(obj, Resources.GetSprite("cactus1"), new Vector2(1, 1)),
                new BoxCollider2D(obj, new Vector2(0.5, 1))
            ]);
        }
        else {
            return new GameObject("cactus", new Transform(new Vector3(10, 0)), (obj) => [
                new CactusController(obj),
                new SpriteRenderer(obj, Resources.GetSprite("cactus2"), new Vector2(1, 1)),
                new BoxCollider2D(obj, new Vector2(1.5, 1))
            ]);
        }
    }
    Pausar() {
        this.pausado = true;
    }
    NewVelocity(vel) {
        this.vel = vel;
    }
}
