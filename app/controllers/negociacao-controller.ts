import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();

    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    constructor(){
        this.inputQuantidade = document.querySelector('#quantidade');
        this.inputValor = document.querySelector('#valor');
        this.inputData = document.querySelector('#data');
        this.negociacoesView.update(this.negociacoes);
    }

    public adiciona(): void {
        const negociacao = this.criaNegociacao();
        if(this.dataEhDiaUtil(negociacao.data)){
            this.negociacoes.adiciona(negociacao);
            this.limparFormulario();
            this.atualizaView();
        }else{
            this.mensagemView.update('Só é possível adicionar negociações em dias úteis.')
        }
        
    }
    
    private dataEhDiaUtil(data: Date): boolean {
        const dia = data.getDay();
        return dia != DiasDaSemana.DOMINGO && dia != DiasDaSemana.SADADO;
    }

    private criaNegociacao(): Negociacao {
        // Acha todos os hifens da data e substitui por virgula (padrao aceito pelo TS)
        const regex = /-/g;
        const data = new Date(this.inputData.value.replace(regex, ','));

        const quantidade = parseInt(this.inputQuantidade.value);
        const valor = parseFloat(this.inputValor.value);

        return new Negociacao(data, quantidade, valor);
    }

    private limparFormulario(): void {
        this.inputData.value = '';
        this.inputQuantidade.value = '';
        this.inputValor.value = '';

        this.focarElemento(this.inputData);
    }

    private focarElemento(elemento: HTMLInputElement): void {
        elemento.focus();
    }

    private atualizaView(): void {
        this.negociacoesView.update(this.negociacoes);
        this.mensagemView.update('Negociação adicionada com sucesso.');
    }
}

