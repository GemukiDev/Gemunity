import { Camera } from "./Render/Camera.js";
import { Renderer } from "./Render/Renderer.js";
import { Input } from "./Input/Input.js";
import { Collider2D } from "./Physics/Collider2D.js";
import { CollisionManager } from "./Physics/CollisionManager.js";
export class Game {
    constructor(gameObjects, testing = false) {
        this.testing = testing;
        this.gameObjects = gameObjects;
    }
    Init() {
        Input.Init();
        this.FindCamera();
        this.gameObjects.forEach(go => {
            go.GetAllComponents().forEach(component => {
                component.Awake();
            });
        });
    }
    Tick(runPhysics) {
        this.RunStarts();
        if (runPhysics)
            this.RunFixedUpdates();
        if (runPhysics)
            this.RunCollisionCheck();
        this.RunUpdates();
        this.RunUpdateCoroutines();
        this.RunDestroys();
        this.Draw();
    }
    RunStarts() {
        this.gameObjects.forEach(go => {
            go.GetAllComponents().forEach(component => {
                if (!component.started) {
                    component.Start();
                    component._CheckStart();
                }
            });
        });
    }
    RunCollisionCheck() {
        const colliders = [];
        this.gameObjects.forEach(go => {
            go.GetAllComponents().forEach(component => {
                if (component instanceof Collider2D) {
                    colliders.push(component);
                }
            });
        });
        const testedColliders = [];
        colliders.forEach(col1 => {
            colliders.forEach(col2 => {
                if (col1 != col2 && !testedColliders.includes(col2))
                    CollisionManager.TestCollision(col1, col2);
            });
            testedColliders.push(col1);
        });
    }
    RunFixedUpdates() {
        this.gameObjects.forEach(go => {
            go.GetAllComponents().forEach(component => {
                component.FixedUpdate();
            });
        });
    }
    RunUpdates() {
        this.gameObjects.forEach(go => {
            go.GetAllComponents().forEach(component => {
                component.Update();
            });
        });
    }
    RunUpdateCoroutines() {
        this.gameObjects.forEach(go => {
            go.GetAllComponents().forEach(component => {
                component._RunUpdateCoroutines();
            });
        });
    }
    RunDestroys() {
        this.gameObjects.forEach(go => {
            if (go.destroyed) {
                go.GetAllComponents().forEach(component => {
                    component.OnDestroy();
                });
            }
        });
        this.gameObjects = this.gameObjects.filter(go => !go.destroyed);
    }
    Draw() {
        if (!Camera.main)
            this.FindCamera();
        if (Camera.main) {
            Camera.main.Draw();
            const renderers = Game.FindObjectsOfType(Renderer);
            renderers.sort(this.RendererComparer).forEach(renderer => renderer.Draw(Camera.main));
            if (this.testing) {
                this.gameObjects.forEach(go => go.GetAllComponents().forEach(c => {
                    c.DrawGizmo(Camera.main);
                }));
            }
        }
    }
    FindCamera() {
        var _a;
        Camera.main = (_a = Game.FindObjectOfType(Camera)) !== null && _a !== void 0 ? _a : null;
    }
    RendererComparer(a, b) {
        if (a.orderInLayer === b.orderInLayer) {
            return b.transform.position.z - a.transform.position.z;
        }
        return a.orderInLayer - b.orderInLayer;
    }
    static FindObjectOfType(typeRef) {
        if (!this.game)
            return null;
        const go = this.game.gameObjects.find(go => go.GetComponent(typeRef));
        if (go)
            return go.GetComponent(typeRef);
    }
    static FindObjectsOfType(typeRef) {
        if (!this.game)
            return [];
        const components = [];
        let comp;
        this.game.gameObjects.forEach(go => {
            comp = go.GetComponents(typeRef);
            if (comp)
                components.push(...comp);
        });
        return components;
    }
    static FindObjectsByName(name) {
        if (!this.game)
            return [];
        return this.game.gameObjects.filter(go => go.name == name);
    }
    static FindObjectByName(name) {
        if (!this.game)
            return null;
        return this.game.gameObjects.find(go => go.name == name);
    }
    static Create(gameObjects, testing = false) {
        if (this.game)
            Game.DestroyGame();
        this.game = new Game(gameObjects, testing);
        this.game.Init();
    }
    static DestroyGame() {
        this.game.gameObjects.forEach(go => {
            go.GetAllComponents().forEach(component => {
                component.OnDestroy();
            });
        });
    }
    static Instantiate(gameObject) {
        if (!this.game)
            throw new Error("Game not yet created");
        this.game.gameObjects.push(gameObject);
        gameObject.GetAllComponents().forEach(component => {
            component.Awake();
        });
        return gameObject;
    }
}
