import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    private negociacoes: Negociacao[] = [];
    
    public adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    public listar(): readonly Negociacao[] {
        // Retornando copia da lista original, evitando mutabilidade
        return this.negociacoes;
    }
}