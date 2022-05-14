import { Game } from "./Core.js";
export class GameObject {
    constructor(name, transform, withComponents) {
        this._active = true;
        this.components = [];
        this._destroyed = false;
        this.name = name;
        this._transform = transform;
        if (withComponents)
            this.components = withComponents(this);
    }
    get activeSelf() { return this._active; }
    ;
    get transform() { return this._transform; }
    ;
    get destroyed() { return this._destroyed; }
    ;
    InitializeComponent(component) {
        component.gameObject = this;
        component.Awake();
    }
    SetActive(active) {
        if (active === this._active)
            return;
        this._active = active;
    }
    AddComponent(component) {
        this.components.push(component);
        this.InitializeComponent(component);
        return component;
    }
    RemoveComponent(component) {
        this.components.remove(component);
    }
    GetComponent(classRef) {
        var obj = this.components.find(c => c instanceof classRef);
        return obj;
    }
    GetComponents(classRef) {
        var obj = this.components.filter(c => c instanceof classRef);
        return obj;
    }
    GetAllComponents() {
        return this.components;
    }
    static Instantiate(gameObject) {
        return Game.Instantiate(gameObject);
    }
    static Destroy(gameObject) {
        gameObject._destroyed = true;
    }
}
