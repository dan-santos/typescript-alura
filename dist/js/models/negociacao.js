export class Negociacao {
    constructor(_data, quantidade, valor) {
        this._data = _data;
        this.quantidade = quantidade;
        this.valor = valor;
    }
    get data() {
        // Retornando novo obj Date identico a data da negociacao, protegendo a referencia de data privada da classe
        return new Date(this._data.getTime());
    }
    get volume() {
        return this.quantidade * this.valor;
    }
}
