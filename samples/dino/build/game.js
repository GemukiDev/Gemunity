import { Gemunity, Resources, Sprite, AudioClip, Game, GameObject, Transform, Camera, Color, Vector3, SpriteRenderer, Vector2, BoxCollider2D, AudioSource, Animator, AnimatorState, SpriteAnimation, TextRenderer, TextAlign, } from "./core/Gemunity.js";
import { CactusGenerator } from "./user/CactusGenerator.js";
import { CloudGenerator } from "./user/CloudGenerator.js";
import { ContadorPuntos } from "./user/ContadorPuntos.js";
import { DinoController } from "./user/DinoController.js";
import { GameController } from "./user/GameController.js";
import { SueloInfinito } from "./user/SueloInfinito.js";
const spriteList = [
    new Sprite("dinoParado", "resources/img/dino.png", 0, 0, 84, 84),
    new Sprite("dinoCorriendo1", "resources/img/dino.png", 84, 0, 84, 84),
    new Sprite("dinoCorriendo2", "resources/img/dino.png", 168, 0, 84, 84),
    new Sprite("dinoGameOver", "resources/img/dino.png", 252, 0, 84, 84),
    new Sprite("cactus1", "resources/img/cactus1.png"),
    new Sprite("cactus2", "resources/img/cactus2.png"),
    new Sprite("nube", "resources/img/nube.png"),
    new Sprite("suelo", "resources/img/suelo.png"),
];
const audioList = [
    new AudioClip("jump", "resources/sound/jump.mp3"),
    new AudioClip("moneda", "resources/sound/moneda.mp3"),
    new AudioClip("gameOver", "resources/sound/gameOver.mp3"),
];
Gemunity.Init();
Promise.all([
    Resources.LoadSprites(spriteList),
    Resources.LoadAudios(audioList)
]).then(() => {
    Gemunity.ShowWellcome();
});
Gemunity.OnPlay(() => {
    Game.Create([
        new GameObject("camera", new Transform(new Vector3(0, 2)), (obj) => [
            new Camera(obj, "mainCanvas", new Color(0.5, 0.9, 0.8), 3)
        ]),
        new GameObject("gameController", new Transform(), (obj) => [
            new GameController(obj),
        ]),
        new GameObject("suelo", new Transform(new Vector3(0, -0.8)), (obj) => [
            new SueloInfinito(obj, 30),
            new SpriteRenderer(obj, Resources.GetSprite("suelo"), new Vector2(30, 1)),
        ]),
        new GameObject("suelo2", new Transform(new Vector3(30, -0.8)), (obj) => [
            new SueloInfinito(obj, 30),
            new SpriteRenderer(obj, Resources.GetSprite("suelo"), new Vector2(30, 1)),
        ]),
        new GameObject("dino", new Transform(new Vector3(-4, 0)), (obj) => [
            new DinoController(obj),
            new SpriteRenderer(obj, Resources.GetSprite("dinoParado"), new Vector2(1, 1)),
            new BoxCollider2D(obj, new Vector2(1, 1)),
            new AudioSource(obj, Resources.GetAudio("jump"), 1, false, false),
            new Animator(obj, {
                "corriendo": true,
                "gameOver": false,
            }, [new AnimatorState((params) => params["corriendo"] && !params["gameOver"], new SpriteAnimation(8, [
                    Resources.GetSprite("dinoCorriendo1"),
                    Resources.GetSprite("dinoCorriendo2"),
                ])),
                new AnimatorState((params) => !params["corriendo"] && !params["gameOver"], new SpriteAnimation(8, [
                    Resources.GetSprite("dinoParado"),
                ])),
                new AnimatorState((params) => params["gameOver"], new SpriteAnimation(8, [
                    Resources.GetSprite("dinoGameOver"),
                ])),
            ]),
        ]),
        new GameObject("cactusGenerator", new Transform(), (obj) => [
            new CactusGenerator(obj),
        ]),
        new GameObject("cloudGenerator", new Transform(), (obj) => [
            new CloudGenerator(obj),
        ]),
        new GameObject("puntos", new Transform(new Vector3(0, 4)), (obj) => [
            new ContadorPuntos(obj),
            new TextRenderer(obj, "PUNTOS: 0", new Vector2(2, 1), Color.White, 20, "Arial", TextAlign.Center),
        ])
    ]);
});
