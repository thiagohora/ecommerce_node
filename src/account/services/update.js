import Customer from 'account/domain/Customer';
import CustomerRepo from 'account/infrastructure/repository/CustomerRepo';

const repository = new CustomerRepo();

export default (req, res) => {
    
    const customer = new Customer(req.body); 
    
    return repository.update(Object.assign(customer, { _id: req.user._id }))
                .then(() => res.redirect('/account'))
                .catch((error) =>{ console.error(error); return res.redirect('/'); });
};