import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');
if(form){
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // Impede que a página de um refresh após submissao
        controller.adiciona();
    })
} else {
    throw Error("Não foi possível inicializar a aplicação. o formulário com classe .form não foi encontrado.")
}

