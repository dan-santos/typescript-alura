export class Negociacoes {
    constructor() {
        this.negociacoes = [];
    }
    adiciona(negociacao) {
        this.negociacoes.push(negociacao);
    }
    listar() {
        // Retornando copia da lista original, evitando mutabilidade
        return this.negociacoes;
    }
}
