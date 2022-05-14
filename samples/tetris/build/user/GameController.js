import { Color, Game, GameObject, Gemunity, Input, KeyCode, MonoBehaviour, TextRenderer, Time, Transform, Vector2, Vector3 } from "../core/Gemunity.js";
import { RectangleRenderer } from "../core/Render/RectangleRenderer.js";
import { Bolsa } from "./Bolsa.js";
import { Escenario } from "./Escenario.js";
import { Ficha } from "./Ficha.js";
export class GameController extends MonoBehaviour {
    constructor(obj, duracionPaso) {
        super(obj);
        this.tiempo = 0;
        this.tiempoParaTecla = 0;
        this.bolsa = new Bolsa();
        this.gameOver = false;
        this.duracionPaso = duracionPaso;
    }
    Start() {
        this.escenario = Game.FindObjectOfType(Escenario);
    }
    Update() {
        if (this.gameOver) {
            if (Input.GetKey(KeyCode.Enter))
                Gemunity.Play();
            return;
        }
        this.tiempo += Time.deltaTime;
        this.tiempoParaTecla -= Time.deltaTime;
        if (this.tiempo >= this.duracionPaso) {
            this.Avanzar();
            this.tiempo = this.tiempo - this.duracionPaso;
        }
        if (!this.escenario.ficha)
            return;
        if (Input.GetKeyDown(KeyCode.Space)) {
            if (!this.escenario.FichaColisionaAlRotar()) {
                this.escenario.ficha.Rotar();
            }
        }
        if (this.tiempoParaTecla <= 0) {
            const direccion = new Vector2(0, 0);
            let movido = false;
            if (Input.GetKey(KeyCode.RightArrow)) {
                movido = true;
                direccion.x++;
            }
            if (Input.GetKey(KeyCode.LeftArrow)) {
                movido = true;
                direccion.x--;
            }
            if (Input.GetKey(KeyCode.DownArrow)) {
                this.Avanzar();
            }
            if (movido) {
                this.tiempoParaTecla = 0.08;
                if (!this.escenario.FichaColisiona(direccion)) {
                    this.escenario.ficha.Mover(direccion);
                }
            }
        }
    }
    Avanzar() {
        if (!this.escenario.ficha)
            this.CrearFicha();
        else if (this.escenario.FichaColisiona(new Vector2(0, -1)))
            this.ColocarFicha();
        else
            this.AvanzarFicha();
    }
    ColocarFicha() {
        this.escenario.ColocarFicha();
        this.escenario.EliminarFilasLlenas();
    }
    CrearFicha() {
        if (this.bolsa.Vacia())
            this.bolsa.Llenar();
        this.escenario.ficha = new Ficha(this.bolsa.NuevaFicha(), new Vector2(3, 15));
        if (this.escenario.FichaColisiona(new Vector2(0, 0))) {
            this.gameOver = true;
            GameObject.Instantiate(new GameObject("bg", new Transform(new Vector3(4.5, 8.5)), (obj) => [
                new RectangleRenderer(obj, new Vector2(10, 10), new Color(0, 0, 0, 0.6)),
            ]));
            GameObject.Instantiate(new GameObject("gameOver", new Transform(new Vector3(4.5, 8.5)), (obj) => [
                new TextRenderer(obj, "GameOver\n Press ENTER to play again", new Vector2(8, 3), Color.White, 64),
            ]));
        }
    }
    AvanzarFicha() {
        this.escenario.ficha.Avanzar();
    }
}
