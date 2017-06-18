import slugfy from 'share/utils/slugfy';

class CustomerDomainConverter {
    
    constructor({ name = null, password = null, email = null, birthday = { day: null, month: null, year: null }, cpf = null, 
                celphone = null, slug = null, address = { street: null, number: null, city: null, neightborhood: null }}) {
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.cpf = cpf;
        this.celphone = celphone;
        this.address = address;
    }

    static getInstance(customer = {}) {
        return new CustomerDomainConverter(customer);
    }

    withName(name){
        this.name = name;  
        return this;
    }

    withEmail(email){
        this.email = email;  
        return this;
    }
    withBirthday(birthday){
        this.birthday = birthday;  
        return this;
    }

    withCpf(cpf){
        this.cpf = cpf;  
        return this;
    }

    withCelphone(celphone){
        this.celphone = celphone;  
        return this;
    }

    withAddress(address){
        this.address = address;  
        return this;
    }

    build() {
        return Object.assign({}, {
            name: this.name,
            email: this.email,
            password: this.password,
            slug: slugfy(this.name),
            birthday: (this.birthday && this.birthday.day) ? `${this.birthday.day}/${this.birthday.month}/${this.birthday.year}` : '',
            cpf: this.cpf,
            celphone: this.celphone,
            street: this.address.street,
            number: this.address.number,
            city: this.address.city,
            neightborhood: this.address.neightborhood
        });
    }
}
export default CustomerDomainConverter;