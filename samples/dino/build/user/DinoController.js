import { Animator, AudioSource, Color, EventEmitter, GameObject, Input, KeyCode, MonoBehaviour, TextRenderer, Time, Transform, Gemunity, Vector2, Vector3 } from "../core/Gemunity.js";
export class DinoController extends MonoBehaviour {
    constructor() {
        super(...arguments);
        this.velY = 0;
        this.tocaSuelo = true;
        this.gravedad = -1;
        this.habilitado = true;
    }
    Awake() {
        this.animator = this.GetComponent(Animator);
        this.audioSource = this.GetComponent(AudioSource);
    }
    Update() {
        this.velY = this.velY + this.gravedad * Time.deltaTime;
        this.transform.position.y += this.velY;
        if (this.transform.position.y <= 0) {
            this.tocaSuelo = true;
            this.velY = 0;
            this.transform.position.y = 0;
            this.animator.SetParameter("corriendo", true);
        }
        if (this.tocaSuelo) {
            if (this.habilitado && Input.GetKeyDown(KeyCode.Space)) {
                this.Saltar();
            }
        }
        if (!this.habilitado && Input.GetKeyDown(KeyCode.Enter)) {
            Gemunity.Play();
        }
    }
    Saltar() {
        this.velY = 0.3;
        this.tocaSuelo = false;
        this.animator.SetParameter("corriendo", false);
        this.audioSource.Play();
    }
    OnCollisionEnter2D(otherCollider) {
        if (otherCollider.gameObject.name.includes("cactus")) {
            this.habilitado = false;
            this.animator.SetParameter("gameOver", true);
            DinoController.OnDinoGameOver.Invoke();
            GameObject.Instantiate(new GameObject("gameOver", new Transform(new Vector3(0, 1.5)), (obj) => [
                new TextRenderer(obj, "GameOver\n Press ENTER to play again", new Vector2(3, 2), Color.White),
            ]));
        }
    }
}
DinoController.OnDinoGameOver = new EventEmitter();
