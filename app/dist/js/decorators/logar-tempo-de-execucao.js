export function logarTempoDeExecucao() {
    return function (target, propertyKey, descriptor) {
        const metodoOriginal = descriptor.value;
        descriptor.value = function (...args) {
            const t1 = performance.now();
            const retornoOriginal = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            console.log(`${propertyKey} com tempo de execução igual a ${(t2 - t1) / 1000} segundos.`);
            retornoOriginal;
        };
        return descriptor;
    };
}
