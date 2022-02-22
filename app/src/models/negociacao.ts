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

    public static criaDe(dataString: string, quantidadeString: string, valorString: string): Negociacao {
        // Acha todos os hifens da data e substitui por virgula (padrao aceito pelo TS)
        const regex = /-/g;
        const data = new Date(dataString.replace(regex, ','));

        const quantidade = parseInt(quantidadeString);
        const valor = parseFloat(valorString);

        return new Negociacao(data, quantidade, valor);
    }
}