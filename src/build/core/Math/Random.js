export class Random {
    static Range(from, to) {
        return from + (to - from) * Math.random();
    }
    static RangeInt(from, toExclusive) {
        return Math.floor(Random.Range(from, toExclusive));
    }
}
