import { Matrix, Vector2 } from "../core/Gemunity.js";
import { Cuadro } from "./Cuadro.js";
export class Cuadricula {
    constructor(filas, columnas) {
        this.filas = filas;
        this.columnas = columnas;
        this.matriz = new Matrix(filas, columnas, null);
        for (let i = 0; i < filas; i++) {
            for (let j = 0; j < columnas; j++) {
                this.matriz.SetValue(i, j, new Cuadro(new Vector2(j, i), 0));
            }
        }
    }
    ForEach(operacion) {
        this.matriz.ForEach(operacion);
    }
    SetValue(fila, columna, valor) {
        const cuadro = this.matriz.GetValue(fila, columna);
        if (cuadro)
            cuadro.SetValor(valor);
        else
            console.log("error");
    }
}
