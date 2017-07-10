export default class AdminUser {
    constructor({ email = null, password = null } = {}) {
        this.email = email;
        this.password = password;
    }
}