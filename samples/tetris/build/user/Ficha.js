import { List, Matrix, Vector2 } from "../core/Gemunity.js";
export var TipoFicha;
(function (TipoFicha) {
    TipoFicha[TipoFicha["CUADRADO"] = 0] = "CUADRADO";
    TipoFicha[TipoFicha["BARRA"] = 1] = "BARRA";
    TipoFicha[TipoFicha["TRIANGULO"] = 2] = "TRIANGULO";
    TipoFicha[TipoFicha["ELE"] = 3] = "ELE";
    TipoFicha[TipoFicha["ELE_INVERSA"] = 4] = "ELE_INVERSA";
    TipoFicha[TipoFicha["ESCALERA"] = 5] = "ESCALERA";
    TipoFicha[TipoFicha["ESCALERA_INVERSA"] = 6] = "ESCALERA_INVERSA";
})(TipoFicha || (TipoFicha = {}));
export class Ficha {
    constructor(tipo, posicion) {
        this.tipo = tipo;
        this.matriz = this.NuevaMatriz();
        this.posicion = posicion;
    }
    NuevaMatriz() {
        let newMatrix;
        switch (this.tipo) {
            case TipoFicha.CUADRADO:
            default:
                newMatrix = new Matrix(4, 4, 0);
                newMatrix.SetValue(0, 1, 1);
                newMatrix.SetValue(0, 2, 1);
                newMatrix.SetValue(1, 1, 1);
                newMatrix.SetValue(1, 2, 1);
                break;
            case TipoFicha.BARRA:
                newMatrix = new Matrix(4, 4, 0);
                newMatrix.SetValue(1, 0, 2);
                newMatrix.SetValue(1, 1, 2);
                newMatrix.SetValue(1, 2, 2);
                newMatrix.SetValue(1, 3, 2);
                break;
            case TipoFicha.TRIANGULO:
                newMatrix = new Matrix(3, 3, 0);
                newMatrix.SetValue(1, 0, 3);
                newMatrix.SetValue(1, 1, 3);
                newMatrix.SetValue(1, 2, 3);
                newMatrix.SetValue(2, 1, 3);
                break;
            case TipoFicha.ELE:
                newMatrix = new Matrix(3, 3, 0);
                newMatrix.SetValue(1, 0, 4);
                newMatrix.SetValue(1, 1, 4);
                newMatrix.SetValue(1, 2, 4);
                newMatrix.SetValue(2, 2, 4);
                break;
            case TipoFicha.ELE_INVERSA:
                newMatrix = new Matrix(3, 3, 0);
                newMatrix.SetValue(1, 0, 5);
                newMatrix.SetValue(1, 1, 5);
                newMatrix.SetValue(1, 2, 5);
                newMatrix.SetValue(2, 0, 5);
                break;
            case TipoFicha.ESCALERA:
                newMatrix = new Matrix(3, 3, 0);
                newMatrix.SetValue(1, 0, 6);
                newMatrix.SetValue(1, 1, 6);
                newMatrix.SetValue(2, 1, 6);
                newMatrix.SetValue(2, 2, 6);
                break;
            case TipoFicha.ESCALERA_INVERSA:
                newMatrix = new Matrix(3, 3, 0);
                newMatrix.SetValue(1, 1, 7);
                newMatrix.SetValue(1, 2, 7);
                newMatrix.SetValue(2, 0, 7);
                newMatrix.SetValue(2, 1, 7);
                break;
        }
        return newMatrix;
    }
    Rotar() {
        if (this.tipo == TipoFicha.CUADRADO)
            return;
        this.matriz = this.matriz.RotateLeft();
    }
    Avanzar() {
        this.Mover(new Vector2(0, -1));
    }
    Mover(direccion) {
        this.posicion = this.posicion.Sum(direccion);
    }
    SimularMovimiento(desplazamiento) {
        const lista = new List();
        this.matriz.ForEach((fila, columna, valor) => {
            if (valor > 0) {
                lista.Add(new Vector2(columna + this.posicion.x + desplazamiento.x, fila + this.posicion.y + desplazamiento.y));
            }
        });
        return lista;
    }
    SimularRotacion() {
        const lista = new List();
        this.matriz.RotateLeft().ForEach((fila, columna, valor) => {
            if (valor > 0) {
                lista.Add(new Vector2(columna + this.posicion.x, fila + this.posicion.y));
            }
        });
        return lista;
    }
}
