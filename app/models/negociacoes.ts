import { Negociacao } from "./negociacao.js";

export class Negociacoes {
    private negociacoes: Negociacao[] = [];
    
    adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    listar(): readonly Negociacao[] {
        // Retornando copia da lista original, evitando mutabilidade
        return this.negociacoes;
    }
}