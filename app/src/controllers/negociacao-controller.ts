import { Negociacao } from "../models/negociacao.js";
import { Negociacoes } from "../models/negociacoes.js";
import { MensagemView } from "../views/mensagem-view.js";
import { NegociacoesView } from "../views/negociacoes-view.js";
import { DiasDaSemana } from "../enums/dias-da-semana.js";
import { logarTempoDeExecucao } from "../decorators/logar-tempo-de-execucao.js";
import { inspect } from "../decorators/inspect.js";
import { domInject } from "../decorators/dom-injector.js";
import { NegociacoesService } from "../services/negociacoes-service.js";
import { imprimir } from "../utils/imprimir.js";

export class NegociacaoController {
    @domInject('#data')
    private inputData: HTMLInputElement;
    @domInject('#quantidade')
    private inputQuantidade: HTMLInputElement;
    @domInject('#valor')
    private inputValor: HTMLInputElement;

    private negociacoes = new Negociacoes();

    private negociacoesView = new NegociacoesView('#negociacoesView');
    private mensagemView = new MensagemView('#mensagemView');

    private negociacoesService = new NegociacoesService();

    constructor(){
        // suprimindo necessidade de tratar possivel retorno nulo
        
        this.negociacoesView.update(this.negociacoes);
    }

    @inspect
    @logarTempoDeExecucao()
    public adiciona(): void {
        const negociacao = Negociacao.criaDe(this.inputData.value, this.inputQuantidade.value, this.inputValor.value);
        if(this.dataEhDiaUtil(negociacao.data)){
            this.negociacoes.adiciona(negociacao);
            imprimir(negociacao, this.negociacoes);
            this.limparFormulario();
            this.atualizaView();
        }else{
            this.mensagemView.update('Só é possível adicionar negociações em dias úteis.');
        }
    }

    public importaDados(): void {
        this.negociacoesService.obterNegociacoes()
            .then(negociacoesDeHoje => {
                return negociacoesDeHoje.filter(negociacaoDeHoje => {
                    return !this.negociacoes.listar()
                        .some(negociacao => negociacao
                            .ehIgual(negociacaoDeHoje));
                });
            })
            .then(negociacoesDeHoje => {
                for(let negociacao of negociacoesDeHoje){
                    this.negociacoes.adiciona(negociacao);
                }
                this.negociacoesView.update(this.negociacoes);
            });
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

