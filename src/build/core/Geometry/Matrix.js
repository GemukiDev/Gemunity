export class Matrix {
    constructor(rows, columns, initialValue) {
        this._rows = rows;
        this._columns = columns;
        this.data = new Array(rows).fill(new Array(columns).fill(initialValue));
        console.log(this.data);
    }
    get rows() { return this._rows; }
    ;
    get columns() { return this._columns; }
    ;
    GetValue(row, column) {
        if (row >= this.rows)
            return null;
        if (column >= this.columns)
            return null;
        return this.data[row][column];
    }
    SetValue(row, column) {
        if (row >= this.rows)
            return;
        if (column >= this.columns)
            return;
        this.data[row][column];
    }
    GetRow(row) {
        if (row >= this.rows)
            return null;
        return this.data[row];
    }
    GetColumn(column) {
        if (column >= this.columns)
            return;
        return this.data.map(r => r[column]);
    }
    SetRow(index, newRow) {
        if (index >= this.rows)
            return;
        for (let i = 0; i < newRow.length; i++) {
            this.data[index][i] = newRow[i];
        }
    }
    SetColumn(index, newColumn) {
        if (index >= this.columns)
            return;
        for (let i = 0; i < newColumn.length; i++) {
            this.data[i][index] = newColumn[i];
        }
    }
    ToString() {
        return this.data.toString();
    }
}
