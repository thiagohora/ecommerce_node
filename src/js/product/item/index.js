import {Router} from 'express';
import ProductServ from 'product/item/service/ProductServ'

const router = Router();
const service = new ProductServ();

router.get('/:slug', (req, res) => {
    console.log(res.locals.cart.count);
    return service.findOne(Object.assign({}, req.params))
                    .then(product => res.render('product/item/template/show', {
                        title: 'Product',
                        layout: 'share/template/main/index',
                        user: req.user || null,
                        product
                    }))
                    .catch(() => res.redirect('/'));   
});

export default router;

