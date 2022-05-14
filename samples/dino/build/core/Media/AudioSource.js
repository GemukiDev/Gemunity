import { MonoBehaviour } from "../MonoBehaviour.js";
export class AudioSource extends MonoBehaviour {
    constructor(obj, clip, volume = 1, loop = false, playOnAwake = false) {
        super(obj);
        this.clip = clip;
        this.volume = volume;
        this.loop = loop;
        this.playOnAwake = playOnAwake;
    }
    Awake() {
        if (this.playOnAwake)
            this.Play();
    }
    Play() {
        if (!this.clip || !this.clip.sound)
            return;
        const sound = this.clip.sound;
        sound.volume = this.volume;
        this.endCallback = () => {
            if (this.loop) {
                sound.play();
                //sound.currentTime = 0;
            }
            else
                sound.removeEventListener("ended", this.endCallback);
        };
        sound.addEventListener("ended", this.endCallback);
        sound.play().catch(e => {
            console.log("error");
        });
    }
    Pause() {
        this.clip.sound.pause();
    }
    Stop() {
        this.clip.sound.addEventListener("ended", this.endCallback);
        this.clip.sound.pause();
        this.clip.sound.currentTime = 0;
    }
    static PlayOneShot(clip, volume = 1) {
        const sound = new Audio(clip.src);
        sound.volume = volume;
        sound.loop = false;
        sound.play();
    }
}
