import Customer from 'account/schema/customer';

export default (req, res) => {
    Customer.findOne({
        slug: req.params.slug
    })
    .then(customer => {
        if(!customer) {
            return res.redirect('/');
        }

        const customer_view = customer.toObject();
        customer_view.birthday = `${customer_view.birthday.day}/${customer_view.birthday.month}/${customer_view.birthday.year}`;

        return res.render('account/template/my-account', {
            title: 'My account',
            customer: customer_view,
            layout: 'share/template/main/index'
        });
    })
    .catch(error => {
        return '';
    });
};