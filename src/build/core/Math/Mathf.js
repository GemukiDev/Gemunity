export class Mathf {
    static get PI() { return Math.PI; }
    ;
    static Sqrt(num) {
        return Math.sqrt(num);
    }
    static Pow(num, pow = 2) {
        return Math.pow(num, pow);
    }
    static Floor(num) {
        return Math.floor(num);
    }
    static Round(num) {
        return Math.round(num);
    }
    static Ceil(num) {
        return Math.ceil(num);
    }
    static Abs(num) {
        return Math.abs(num);
    }
    static Max(num1, num2) {
        return Math.max(num1, num2);
    }
    static Min(num1, num2) {
        return Math.min(num1, num2);
    }
    static Clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
    static Lerp(start, end, t) {
        return start + (end - start) * t;
    }
    static Approximately(a, b, tolerance = 1e-8) {
        return Math.abs(a - b) < tolerance;
    }
}
