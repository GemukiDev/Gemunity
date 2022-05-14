import { Time } from "./Time.js";
export class YieldCondition {
}
export class WaitFor extends YieldCondition {
    constructor(condition) {
        super();
        this.condition = condition;
    }
    _OnUpdate() { }
    _IsFullfilled() {
        return this.condition();
    }
}
export class WaitForSeconds extends YieldCondition {
    constructor(seconds) {
        super();
        this.seconds = seconds;
        this.secondsElapsed = 0;
    }
    _IsFullfilled() {
        return this.secondsElapsed >= this.seconds;
    }
    _OnUpdate() {
        this.secondsElapsed += Time.deltaTime;
    }
}
export class Coroutine {
    constructor(enumerator) {
        this.enumerator = enumerator;
        this._Next();
    }
    get isFinished() { return this._isFinished; }
    get yieldCondition() { return this._yieldCondition; }
    _Next() {
        const result = this.enumerator.next();
        console.log(result);
        this._isFinished = result.done;
        this._yieldCondition = result.value;
    }
    _OnUpdate() {
        var _a;
        (_a = this._yieldCondition) === null || _a === void 0 ? void 0 : _a._OnUpdate();
    }
    _ConditionFullfilled() {
        if (this._yieldCondition == null)
            return true;
        else
            return this._yieldCondition._IsFullfilled();
    }
}
