class EmitterData {
    constructor(func, context = null) {
        this.func = func;
        this.context = context;
    }
}
export class EventEmitter {
    constructor() {
        this.funcList = [];
    }
    AddListener(listener, context = null) {
        this.funcList.push(new EmitterData(listener, context));
    }
    RemoveListener(listener) {
        this.funcList.remove(listener);
    }
    Invoke(data) {
        this.funcList.forEach(item => {
            if (item.context) {
                item.func.bind(item.context)(data);
            }
            else {
                item.func(data);
            }
        });
    }
}
