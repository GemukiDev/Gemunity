import { Coroutine } from "./Coroutine.js";
export class MonoBehaviour {
    constructor(gameObject) {
        this._started = false;
        this.coroutines = [];
        this.gameObject = gameObject;
    }
    get transform() { return this.gameObject.transform; }
    ;
    get started() { return this._started; }
    ;
    Awake() {
    }
    Start() {
    }
    Update() {
    }
    FixedUpdate() {
    }
    OnDestroy() {
    }
    OnCollisionEnter2D(otherCollider) {
    }
    OnCollisionStay2D(otherCollider) {
    }
    OnCollisionExit2D(otherCollider) {
    }
    DrawGizmo(camera) {
    }
    StartCoroutine(enumerator) {
        const cor = new Coroutine(enumerator);
        this.coroutines.push(cor);
        return cor;
    }
    StopCoroutine(coroutine) {
        this.coroutines.remove(coroutine);
    }
    StopAllCoroutines() {
        this.coroutines.clear();
    }
    AddComponent(component) {
        return this.gameObject.AddComponent(component);
    }
    GetComponent(classRef) {
        return this.gameObject.GetComponent(classRef);
    }
    GetComponents() {
        return this.gameObject.GetAllComponents();
    }
    _CheckStart() {
        this._started = true;
    }
    _RunUpdateCoroutines() {
        if (this.coroutines.length == 0)
            return;
        this.coroutines.forEach(cor => {
            cor._OnUpdate();
            if (cor._ConditionFullfilled())
                cor._Next();
        });
        this.coroutines = this.coroutines.filter(c => !c.isFinished);
    }
}
