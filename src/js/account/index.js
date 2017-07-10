import { Router } from 'express';
import ValidateLogin from 'account/services/validateLogin';
import CustomerServ from 'account/services/CustomerServ';
import Customer from 'account/domain/Customer';

const router = Router();
const service = new CustomerServ();

function showForm(res, customer, user = null) {
    const page = user ? 'account/template/my-account' : 'account/template/new'; 
    return res.render(page, {
        title: 'My account',
        customer,
        layout: 'share/template/main/index',
        user
    });
}

router.get('/', (req, res) => {
    if(req.user) {
        return res.redirect(`/account/${req.user.slug}`);
    } 
    
    return res.render('account/template/index', {
                title: 'Account ',
                layout: 'share/template/main/index',
                user: null
            });
});

router.get('/new', (req, res) => {
   
    if (!req.user) {
        return showForm(res, new Customer());
    }

    if(req.user.slug !== req.params.slug) {
        return res.redirect(`/account/${req.user.slug}`);
    }
   
});

router.get('/logout', ValidateLogin, require('account/services/logout').default);

router.get('/:slug',(req, res) => {
     return service.findOne({ slug : req.params.slug })
                        .then(customer => showForm(res, customer, req.user))
                        .catch(error => res.redirect('/'));
});

router.post('/new', (req, res) => {
    const customer = new Customer(req.body); 
    return service.save(customer)
                .then(() => res.redirect('/account'))
                .catch(() => res.redirect('/'));
});

router.put('/:id', ValidateLogin, (req, res) => {
    const customer = new Customer(req.body); 
    return service.update(Object.assign(customer, { _id: req.user._id }))
                    .then(() => res.redirect('/account'))
                    .catch(() => res.redirect('/'));
});

router.post('/login', require('account/services/login').default);

export default router;
