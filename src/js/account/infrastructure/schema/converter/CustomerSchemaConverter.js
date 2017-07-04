import slugfy from 'share/utils/slugfy';

class CustomerSchemaConverter {
    
    constructor({ name = null, email = null, birthday = null, cpf = null, 
                celphone = null, street = null, number = null, city = null, neightborhood = null }) {
        this.name = name;
        this.email = email;
        this.birthday = birthday;
        this.cpf = cpf;
        this.celphone = celphone;
        this.street = street;
        this.number = number;
        this.city = city;
        this.neightborhood = neightborhood;
    }

    static getInstance(customer = {}) {
        return new CustomerSchemaConverter(customer);
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

    withStreet(street){
        this.street = street;  
        return this;
    }

    withNumber(number){
        this.number = number;  
        return this;
    }

    withCity(city){
        this.city = city;  
        return this;
    }

    withNeightborhood(neightborhood){
        this.neightborhood = neightborhood;
        return this;
    }

    build() {
        const birthday = (this.birthday) ? this.birthday.toString().split('/') : new Array(3);

        return Object.assign({}, {
            name: this.name,
            email: this.email,
            slug: slugfy(this.name),
            birthday: {
                day: birthday[0],
                month: birthday[1],
                year: birthday[2]
            },
            cpf: this.cpf,
            celphone: this.celphone,
            address:{
                street: this.street,
                number: this.number,
                city: this.city,
                neightborhood: this.neightborhood
            }
        });
    }
}
export default CustomerSchemaConverter;