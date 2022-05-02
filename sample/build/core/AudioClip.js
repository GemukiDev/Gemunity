import { Media } from "./Media.js";
export class AudioClip extends Media {
    constructor(name, src) {
        super(name, src);
    }
    get sound() { return this._sound; }
    ;
    SetMedia(sound) {
        this._sound = sound;
    }
}
