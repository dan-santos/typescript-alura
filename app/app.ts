import { NegociacaoController } from "./controllers/negociacao-controller.js";

const controller = new NegociacaoController();
const form = document.querySelector('.form');

form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // Impede que a página de um refresh após submissao
    controller.adiciona();
})