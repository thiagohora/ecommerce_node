import { Router } from 'express';
import Customer from 'account/schema/customer';

const router = Router();

router.get('/', (req, res) => {

    console.log(req.user);
    return res.render('account/template/index', {
        title: 'Account ',
        layout: 'share/template/main/index',
        user: req.user || undefined
    });
});

router.get('/new', (req, res) => {
    return res.render('account/template/new', {
        title: 'Account ',
        customer: new Customer(),
        layout: 'share/template/main/index'
    });
});

router.post('/new', require('account/services/create').default);

router.get('/:slug', require('account/services/login').default);

router.post('/login', require('account/services/show').default);

export default router;
