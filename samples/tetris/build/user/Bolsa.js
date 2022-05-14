import { List, Random } from "../core/Gemunity.js";
import { TipoFicha } from "./Ficha.js";
export class Bolsa {
    constructor() {
        this.fichas = new List();
    }
    Llenar() {
        this.fichas.Add(TipoFicha.CUADRADO);
        this.fichas.Add(TipoFicha.BARRA);
        this.fichas.Add(TipoFicha.TRIANGULO);
        this.fichas.Add(TipoFicha.ELE);
        this.fichas.Add(TipoFicha.ELE_INVERSA);
        this.fichas.Add(TipoFicha.ESCALERA);
        this.fichas.Add(TipoFicha.ESCALERA_INVERSA);
    }
    Vacia() {
        return this.fichas.Count == 0;
    }
    NuevaFicha() {
        return this.fichas.removeAt(Random.RangeInt(0, this.fichas.Count));
    }
}
