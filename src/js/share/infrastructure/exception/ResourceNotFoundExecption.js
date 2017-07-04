class ResourceNotFoundExecption extends Error {
    constructor(name) {
        super(`Resource ${name} not found!`);
    }
}