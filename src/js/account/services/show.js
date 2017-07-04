import CustomerRepo from 'account/infrastructure/repository/CustomerRepo';
import Customer from 'account/domain/Customer';

const repository = new CustomerRepo();

function showForm(res, customer, user = null) {
    const page = user ? 'account/template/my-account' : 'account/template/new'; 
    return res.render(page, {
        title: 'My account',
        customer,
        layout: 'share/template/main/index',
        user
    });
}

export default (req, res) => {
   
    if (!req.user) {
        return showForm(res, new Customer());
    }

    if(req.user.slug !== req.params.slug) {
        return res.redirect(`/account/${req.user.slug}`);
    }

    repository.findOne({ slug : req.params.slug }).then(optCustomer => {

        if(!optCustomer.isPresent()) {
            return res.redirect('/');
        }

        return showForm(res, optCustomer.get(), req.user);

    }).catch(error => res.redirect('/'));
};