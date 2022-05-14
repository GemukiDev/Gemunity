import { EventEmitter } from "../EventEmiter.js";
class MediaData {
    constructor(name, src) {
        this.src = src;
        this.name = name;
    }
    toString() {
        return `MediData<T>(name: ${this.name}, src: ${this.src})`;
    }
}
export class Resources {
    static AddLoadListener(listener) {
        this.updateLoadEvent.AddListener(listener);
    }
    static EmitUpdateEvent(percent) {
        this.updateLoadEvent.Invoke(percent);
    }
    static OnFileLoaded() {
        this.filesLoadedCount++;
        this.EmitUpdateEvent(this.filesLoadedCount / this.filesQueuedCount);
    }
    static OnFileQueued() {
        this.filesQueuedCount++;
    }
    static GetSprite(name) {
        return this.sprites.find(sprite => sprite.name === name);
    }
    static GetAudio(name) {
        return this.audioClips.find(audio => audio.name === name);
    }
    static LoadSprites(spriteList) {
        this.sprites.push(...spriteList);
        return this.LoadFiles(this.sprites, this.LoadImage.bind(this), this.ImageSaver.bind(this));
    }
    static LoadAudios(audioClipList) {
        this.audioClips.push(...audioClipList);
        return this.LoadFiles(this.audioClips, this.LoadSound.bind(this), this.SoundSaver.bind(this));
    }
    static LoadFiles(collector, fileLoader, fileSaver) {
        return new Promise((resolve, reject) => {
            const resourceSrcList = [];
            collector.forEach(file => {
                if (!resourceSrcList.includes(file.src)) {
                    resourceSrcList.push(new MediaData(file.name, file.src));
                }
            });
            const promiseList = [];
            resourceSrcList.forEach(data => {
                this.OnFileQueued();
                promiseList.push(fileLoader(data));
            });
            Promise.all(promiseList).then((loadedFiles) => {
                fileSaver(loadedFiles);
                resolve();
            }).catch(e => reject(e));
        });
    }
    static LoadImage(imageData) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            const listenerOK = () => {
                img.removeEventListener('load', listenerOK);
                this.OnFileLoaded();
                imageData.data = img;
                resolve(imageData);
            };
            const listenerError = () => {
                img.removeEventListener('error', listenerError);
                reject("Error while loading image: " + imageData.toString());
            };
            img.addEventListener('load', listenerOK, false);
            img.addEventListener('error', listenerError);
            img.src = imageData.src;
        });
    }
    static LoadSound(audioData) {
        return new Promise((resolve, reject) => {
            let audio = new Audio(audioData.src);
            const listenerOK = () => {
                audio.removeEventListener('canplaythrough', listenerOK);
                this.OnFileLoaded();
                audioData.data = audio;
                resolve(audioData);
            };
            const listenerError = () => {
                audio.removeEventListener('error', listenerError);
                reject("Error while loading sound: " + audioData.toString());
            };
            audio.addEventListener('canplaythrough', listenerOK, false);
            audio.addEventListener('error', listenerError);
        });
    }
    static ImageSaver(images) {
        this.images.push(...images);
        let match;
        this.sprites.forEach(sprite => {
            match = images.find(img => img.name == sprite.name);
            if (match)
                sprite.SetMedia(match.data);
        });
    }
    static SoundSaver(audios) {
        this.audios.push(...audios);
        let match;
        this.audioClips.forEach(clip => {
            match = audios.find(audio => audio.name == clip.name);
            if (match)
                clip.SetMedia(match.data);
        });
    }
}
Resources.images = [];
Resources.sprites = [];
Resources.audios = [];
Resources.audioClips = [];
Resources.updateLoadEvent = new EventEmitter();
Resources.filesQueuedCount = 0;
Resources.filesLoadedCount = 0;
