import Customer from 'account/schema/customer';
import slugfy from 'share/utils/slugfy';

export default (req, res) => {
    
    const birthday = req.body.birthday.toString().split('/');

    const customer = {
        name: req.body.name,
        email: req.body.email,
        slug: slugfy(req.body.name),
        birthday: {
            day: birthday[0],
            month:  [1],
            year: birthday[2]
        },
        cpf: req.body.cpf,
        celphone: req.body.celphone,
        address:{
            street: req.body.street,
            number: req.body.number,
            city: req.body.city,
            neightborhood: req.body.neightborhood
        }
    };
    
    Customer.register(customer, req.body.password, (error, account) => {
        if (error) {
            console.error(error);
            return res.redirect('/');
        }
        return res.redirect('/account');
    });
};