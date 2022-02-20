export class Negociacao {

    constructor(
        private _data: Date, 
        readonly quantidade: number, 
        readonly valor: number
    ) {}

    get data(): Date {
        // Retornando novo obj Date identico a data da negociacao, protegendo a referencia de data privada da classe
        return new Date(this._data.getTime());
    }

    get volume(): number {
        return this.quantidade * this.valor;
    }
}