import { EventEmitter, List, Matrix, MonoBehaviour } from "../core/Gemunity.js";
import { Cuadricula } from "./Cuadricula.js";
export class Escenario extends MonoBehaviour {
    Awake() {
        this.cuadricula = new Cuadricula(18, 10);
        this.fichasApiladas = new Matrix(18, 10, 0);
    }
    Update() {
        this.cuadricula.ForEach((fila, columna, cuadro) => {
            cuadro.SetValor(this.fichasApiladas.GetValue(fila, columna));
        });
        if (this.ficha) {
            this.ficha.matriz.ForEach((fila, columna, valor) => {
                if (valor == 0)
                    return;
                this.cuadricula.SetValue(fila + this.ficha.posicion.y, columna + this.ficha.posicion.x, valor);
            });
        }
    }
    ColocarFicha() {
        if (this.ficha) {
            this.ficha.matriz.ForEach((fila, columna, valor) => {
                if (valor == 0)
                    return;
                this.fichasApiladas.SetValue(fila + this.ficha.posicion.y, columna + this.ficha.posicion.x, valor);
            });
        }
        this.ficha = null;
    }
    EliminarFilasLlenas() {
        let filasLlenas = this.ComprobarFilasLlenas();
        filasLlenas.reverse();
        for (let i = 0; i < filasLlenas.length; i++) {
            this.EliminarFila(filasLlenas[i]);
        }
    }
    EliminarFila(fila) {
        for (let i = fila; i < this.fichasApiladas.rows - 1; i++) {
            this.fichasApiladas.SetRow(i, this.fichasApiladas.GetRow(i + 1));
        }
        for (let j = 0; j < this.fichasApiladas.rows; j++) {
            this.fichasApiladas.SetValue(this.fichasApiladas.rows - 1, j, 0);
        }
        Escenario.OnLineaEliminada.Invoke(100);
    }
    ComprobarFilasLlenas() {
        const lista = new List();
        for (let i = 0; i < this.fichasApiladas.rows; i++) {
            if (this.fichasApiladas.GetRow(i).every(c => c != 0))
                lista.Add(i);
        }
        return lista;
    }
    FichaColisiona(direccion) {
        const celdasOcupadas = this.ficha.SimularMovimiento(direccion);
        if (celdasOcupadas.Any(v => v.y < 0))
            return true;
        if (celdasOcupadas.Any(v => this.fichasApiladas.GetValue(v.y, v.x) != 0))
            return true;
        return false;
    }
    FichaColisionaAlRotar() {
        const celdasOcupadas = this.ficha.SimularRotacion();
        if (celdasOcupadas.Any(v => v.y < 0 || v.x < 0 || v.x >= this.cuadricula.columnas))
            return true;
        if (celdasOcupadas.Any(v => this.fichasApiladas.GetValue(v.y, v.x) != 0))
            return true;
        return false;
    }
}
Escenario.OnLineaEliminada = new EventEmitter();
