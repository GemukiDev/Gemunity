import { GameObject, SpriteRenderer, Resources, Vector2, Transform, Color } from "../core/Gemunity.js";
export class Cuadro {
    constructor(coord, valor) {
        this.gameObject = GameObject.Instantiate(new GameObject("cuadro", new Transform(coord.ToVector3()), (obj) => [
            new SpriteRenderer(obj, Resources.GetSprite("cuadro"), new Vector2(1, 1)),
            //new TextRenderer(obj, coord.ToString(), new Vector2(1,1), Color.White, 16, "Arial", TextAlign.Center, FontWeight.Normal, FontStyle.Normal, TextWrap.Fit, 1, 2),
        ]));
        this.renderer = this.gameObject.GetComponent(SpriteRenderer);
        this.coord = coord;
        this.SetValor(valor);
    }
    SetValor(valor) {
        if (valor != this._valor) {
            this._valor = valor;
            this.renderer.color = this.GetColor();
        }
    }
    GetColor() {
        switch (this._valor) {
            case 0:
                return Color.Transparent;
            case 1:
                return Color.Red;
            case 2:
                return Color.Yellow;
            case 3:
                return Color.Orange;
            case 4:
                return Color.Green;
            case 5:
                return new Color(0, 0.8, 0.9);
            case 6:
                return new Color(0.2, 0.3, 1);
            case 7:
                return new Color(0.6, 0.1, 1);
            default:
                return Color.Magenta;
        }
    }
    toString() {
        return this._valor;
    }
}
