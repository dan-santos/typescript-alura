import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();

    constructor(){
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.inputData = document.querySelector('#data');
    }

    adiciona(): void {
        const negociacao = this.criaNegociacao();
        this.negociacoes.adiciona(negociacao);
        console.log(this.negociacoes.listar());
        this.limparFormulario();
    }    

    criaNegociacao(): Negociacao {
        // Acha todos os hifens da data e substitui por virgula (padrao aceito pelo TS)
        const regex = /-/g;
        const data = new Date(this.inputData.value.replace(regex, ','));

        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);

        return new Negociacao(data, quantidade, valor);
    }

    limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';

        this.focarElemento(this.inputData);
    }

    focarElemento(elemento: HTMLInputElement): void {
        elemento.focus();
    }
}

