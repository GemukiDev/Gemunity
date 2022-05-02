import { Gemunity, Resources, Sprite, AudioClip, Game, GameObject, Transform, Camera, Color, Vector3, SpriteRenderer, Vector2, BoxCollider2D, AudioSource, Animator, AnimatorState, SpriteAnimation, TextRenderer, TextAlign, } from "./core/Gemunity.js";

const spriteList = [
    //new Sprite("dinoParado", "resources/img/dino.png", 0, 0, 84, 84),
];
const audioList = [
    //new AudioClip("jump", "resources/sound/jump.mp3"),
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
        ])
    ]);
});
