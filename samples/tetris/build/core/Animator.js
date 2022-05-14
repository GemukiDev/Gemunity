import { MonoBehaviour } from "./MonoBehaviour.js";
import { SpriteRenderer } from "./SpriteRenderer.js";
import { Time } from "./Time.js";
export class AnimatorState {
    constructor(condition, animation) {
        this.condition = condition;
        this.animation = animation;
    }
}
export class SpriteAnimation {
    constructor(fps, spriteList) {
        this.fps = fps;
        this.spriteList = spriteList;
    }
}
export class Animator extends MonoBehaviour {
    constructor(obj, parameters, states) {
        super(obj);
        this.spriteRenderer = null;
        this.delta = 0;
        this.frame = 0;
        this.parameters = parameters;
        this.states = states;
    }
    Awake() {
        this.spriteRenderer = this.GetComponent(SpriteRenderer);
        this.ChangeState(this.states[0]);
    }
    Start() {
        if (!this.spriteRenderer || !this.currentState)
            return;
        this.UpdateSprite();
    }
    Update() {
        if (!this.spriteRenderer || !this.currentState)
            return;
        const newState = this.states.find(s => s != this.currentState && s.condition(this.parameters));
        if (newState)
            this.ChangeState(newState);
        else
            this.delta = (this.delta + Time.deltaTime);
        this.newFrame = this.frame + Math.floor(this.delta / this.frameDuration);
        this.newFrame = this.newFrame % this.currentState.animation.spriteList.length;
        this.delta = this.delta % this.frameDuration;
        if (this.frame != this.newFrame) {
            this.frame = this.newFrame;
            this.UpdateSprite();
        }
    }
    SetParameter(key, value) {
        this.parameters[key] = value;
    }
    UpdateSprite() {
        this.spriteRenderer.sprite = this.currentState.animation.spriteList[this.frame];
    }
    ChangeState(newState) {
        this.currentState = newState;
        this.frame = 0;
        this.newFrame = 0;
        this.delta = 0;
        this.frameDuration = 1 / this.currentState.animation.fps;
        this.UpdateSprite();
    }
}
