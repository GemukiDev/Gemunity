import { Config, Gemunity, Resources, Sprite, Game, GameObject, Transform, Camera, Color, Vector3, Vector2, TextRenderer, TextAlign, FontWeight, FontStyle, TextWrap, } from "./core/Gemunity.js";
import { RectangleRenderer } from "./core/Render/RectangleRenderer.js";
import { Escenario } from "./user/Escenario.js";
import { GameController } from "./user/GameController.js";
import { Puntuacion } from "./user/Puntuacion.js";
const spriteList = [
    new Sprite("cuadro", "resources/img/cuadro.png"),
];
Gemunity.Init();
Promise.all([
    Resources.LoadSprites(spriteList)
]).then(() => {
    Gemunity.ShowWellcome();
});
Gemunity.OnPlay(() => {
    Config.fixedUpdatesPerSecond = 15;
    Game.Create([
        new GameObject("camera", new Transform(new Vector3(5, 8.5)), (obj) => [
            new Camera(obj, "mainCanvas", new Color(0.5, 0.5, 0.6), 9)
        ]),
        new GameObject("gameController", new Transform(), (obj) => [
            new GameController(obj, 0.7)
        ]),
        new GameObject("escenario", new Transform(new Vector3(4.5, 8.5)), (obj) => [
            new Escenario(obj),
            new RectangleRenderer(obj, new Vector2(10, 18), Color.Black, -1),
        ]),
        new GameObject("puntuacion", new Transform(new Vector3(11.5, 12)), (obj) => [
            new Puntuacion(obj),
            new TextRenderer(obj, "", new Vector2(3, 2), Color.Grey, 200, "Arial", TextAlign.Center, FontWeight.Bold, FontStyle.Normal, TextWrap.Fit, 1.2, 2),
            new RectangleRenderer(obj, new Vector2(4, 3), Color.White, 1),
        ]),
    ]);
});
