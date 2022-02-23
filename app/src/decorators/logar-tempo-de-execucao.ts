export function logarTempoDeExecucao(emSegundos: boolean=false) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ){
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {
            let divisor = 1;
            let unidade = 'milissegundos';

            if(emSegundos){
                divisor = 1000;
                unidade = 'segundos';
            }

            const t1 = performance.now();
            
            const retornoOriginal = metodoOriginal.apply(this, args);

            const t2 = performance.now();
            console.log(`${propertyKey} com tempo de execução igual a ${(t2-t1)/divisor} ${unidade}.`);
            retornoOriginal;
        }
        return descriptor;
    }
}