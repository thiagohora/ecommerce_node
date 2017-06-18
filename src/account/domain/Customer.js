class Customer {
    constructor({ name = null, password = null, email = null, birthday = null, cpf = null, 
                celphone = null, street = null, number = null, city = null, neightborhood = null } = {}) {
        this.name = name;
        this.password = password;
        this.email = email;
        this.birthday = birthday;
        this.cpf = cpf;
        this.celphone = celphone;
        this.street = street;
        this.number = number;
        this.city = city;
        this.neightborhood = neightborhood;
    }
}

export default Customer;