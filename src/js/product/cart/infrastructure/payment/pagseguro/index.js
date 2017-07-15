import PagSeguro from 'pagseguro';
import Properties from 'share/infrastructure/env/properties'

class PagSeguroConfig {

    static getInstance() {
        return new PagSeguroConfig().pagseguro;
    }

    constructor() {
        this.pagseguro = new PagSeguro({
            email: Properties.PagSeguro.user,
            token: Properties.PagSeguro.token,
            mode: Properties.PagSeguro.mode
        });

        this.pagseguro.currency('BRL')
            .reference(12345);
    }

}

export default PagSeguroConfig;