import { Modelo } from "../interfaces/modelo.js";
import { Negociacao } from "./negociacao.js";

export class Negociacoes implements Modelo<Negociacoes>{

    private negociacoes: Negociacao[] = [];
    
    public adiciona(negociacao: Negociacao): void {
        this.negociacoes.push(negociacao);
    }

    public listar(): readonly Negociacao[] {
        // Retornando copia da lista original, evitando mutabilidade
        return this.negociacoes;
    }

    public paraTexto(): string {
        return JSON.stringify(this.listar(), null, 2);
    }

    public ehIgual(negociacoes: Negociacoes): boolean {
        return JSON.stringify(this.negociacoes) === JSON.stringify(negociacoes.listar());
    }
}