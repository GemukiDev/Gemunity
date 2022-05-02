Array.prototype.removeAt = function (index) {
    return this.splice(index, 1)[0];
};
Array.prototype.remove = function (elem) {
    const result = this.splice(this.findIndex(e => e === elem), 1);
    if (result.length == 0)
        return null;
    else
        return result[0];
};
Array.prototype.clear = function () {
    this.length = 0;
};
