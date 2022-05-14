export class Matrix {
    constructor(rows, columns, initialValue) {
        this._rows = rows;
        this._columns = columns;
        this.data = new Array(rows).fill(null).map(o => new Array(columns).fill(initialValue));
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
    SetValue(row, column, value) {
        if (row >= this.rows)
            return;
        if (column >= this.columns)
            return;
        this.data[row][column] = value;
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
    ForEach(operacion) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                operacion(i, j, this.data[i][j]);
            }
        }
    }
    RotateRight() {
        const m = new Matrix(this.columns, this.rows, null);
        for (let i = 0; i < this.columns; i++) {
            m.SetRow(i, this.GetColumn(i).slice().reverse());
        }
        return m;
    }
    RotateLeft() {
        const m = new Matrix(this.columns, this.rows, null);
        for (let i = 0; i < this.rows; i++) {
            m.SetColumn(i, this.GetRow(i).slice().reverse());
        }
        return m;
    }
    ToString() {
        return this.data.map(r => r.map(c => c.toString()).join(`, `)).join(`\n`);
    }
    ToStringInverted() {
        return this.data.slice().reverse().map(r => r.map(c => c.toString()).join(`, `)).join(`\n`);
    }
}
