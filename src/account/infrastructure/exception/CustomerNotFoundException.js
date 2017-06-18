class CustomerNotFoundExecption extends Error {
    constructor(customer) {
        super(`Customer ${customer} not found!`);
    }
}