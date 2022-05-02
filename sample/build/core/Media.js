export class Media {
    constructor(name, src) {
        this._name = name;
        this._src = src;
    }
    get name() { return this._name; }
    ;
    get src() { return this._src; }
    ;
}
