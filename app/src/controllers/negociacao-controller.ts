import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";

export class NegociacaoController {
    private inputData: HTMLInputElement;
    private inputQuantidade: HTMLInputElement;
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();

    private negociacoesView = new NegociacoesView('#negociacoesView', true);
    private mensagemView = new MensagemView('#mensagemView');

    constructor(){
        // suprimindo necessidade de tratar possivel retorno nulo
        this.inputQuantidade = document.querySelector('#quantidade') as HTMLInputElement;
        this.inputValor = document.querySelector('#valor') as HTMLInputElement;
        this.inputData = document.querySelector('#data') as HTMLInputElement;
        this.negociacoesView.update(this.negociacoes);
    }

    @logarTempoDeExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
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

