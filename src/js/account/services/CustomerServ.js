import Customer from 'account/domain/Customer';
import CustomerRepo from 'account/infrastructure/repository/CustomerRepo';
import ResourceNotFoundExecption from 'share/infrastructure/exception/ResourceNotFoundExecption';

const repository = new CustomerRepo();

class CustomerServ {
    save(customer) {
        return new Promise((resolve, reject) => {
            return repository.save(customer)
                                .then(resolve)
                                .catch(reject);
        });
    }

    findOne(customer) {
        return new Promise((resolve, reject) => {
            return  repository.findOne(customer)
                                .then(optCustomer => {
                                    if(!optCustomer.isPresent()) {
                                        return reject(new ResourceNotFoundExecption(`Custome slug: ${customer}`));
                                    }
                                    return resolve(optCustomer.get());

                    }).catch(reject);
        });
    }

    update(customer) {
        return new Promise((resolve, reject) => {
            return repository.update(customer)
                                .then(resolve)
                                .catch(reject);
        });
    }
}

export default CustomerServ;