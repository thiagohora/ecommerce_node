import Customer from 'account/infrastructure/schema/Customer';
import ConverterToSchema from 'account/infrastructure/schema/converter/CustomerSchemaConverter';
import ConverterToDomain from 'account/infrastructure/schema/converter/CustomerDomainConverter';
import Optional from 'optional-js';

class CustomerRepo {

    save(customer) { 
        return new Promise((resolve, reject) => {
            try {
                const password = customer.password; 
                const newCustomer = ConverterToSchema.getInstance(customer).build();
                Customer.register(newCustomer, password, (error, newCustomer) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(newCustomer);
                });
             } catch(e) {
                 return reject(e);
             }
        });
    }

    update(customer) { 
        return new Promise((resolve, reject) => {
            try {
                const password = customer.password;
                const newCustomer = ConverterToSchema.getInstance(customer).build();
                return Customer.findById(customer._id).then(oldCustomer => {
                    if(!oldCustomer){
                        return resolve(Optional.empty());
                    }
                    
                    if(password) {
                        oldCustomer.setPassword(password, (error, update, passErr) => {
                            if(error || passErr){
                                const cause = error || passErr;
                                return reject(cause);
                            }
                            update.save();
                        });
                    }

                    return Customer.findByIdAndUpdate(customer._id, newCustomer)
                                .then(resolve)
                                .catch(reject);
                });
            } catch (e) {
                return reject(e);
            }
        });
    }

    findOne(customer) {
        return new Promise((resolve, reject) => {
            return Customer.findOne(customer).then(customer => {
                if(customer) {
                    try {
                        return resolve(Optional.of(ConverterToDomain.getInstance(customer.toObject()).build()));
                    } catch(e) {    
                        return reject(e);
                    }
                }
                return resolve(Optional.empty());
            });
        });
    }
}

export default CustomerRepo;