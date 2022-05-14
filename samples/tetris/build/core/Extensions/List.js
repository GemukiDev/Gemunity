export class List extends Array {
    get Count() { return this.length; }
    ;
    Add(elem) {
        this.push(elem);
    }
    AddRange(elems) {
        this.push(...elems);
    }
    Remove(elem) {
        return this.remove(elem);
    }
    RemoveAt(index) {
        return this.removeAt(index);
    }
    Clear() {
        return this.clear();
    }
    Contains(elem) {
        return this.includes(elem);
    }
    Insert(elem) {
        this.unshift(elem);
    }
    InsertRange(elems) {
        for (let i = elems.length - 1; i >= 0; i--) {
            this.unshift(elems[i]);
        }
    }
    IndexOf(elem) {
        return this.indexOf(elem);
    }
    Find(comparator) {
        return this.find(comparator);
    }
    FindAll(comparator) {
        return this.filter(comparator);
    }
    RemoveAll(comparator) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (comparator(this[i])) {
                this.RemoveAt(i);
            }
        }
    }
    RemoveRange(elems) {
        for (let i = this.length - 1; i >= 0; i--) {
            if (elems.includes(this[i])) {
                this.RemoveAt(i);
            }
        }
    }
    Reverse() {
        this.reverse();
    }
    Sort(comparator) {
        return this.sort(comparator);
    }
    Any(comparator) {
        return this.some(comparator);
    }
    All(comparator) {
        return this.All(comparator);
    }
}
