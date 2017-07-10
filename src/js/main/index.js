import {Router} from 'express';
import ProductServ from 'product/item/service/ProductServ';

const router = Router();
const productServ = new ProductServ();

router.get('/', (req, res) => {
     return productServ.getAllEnable()
            .then(optProducts => {
                return res.render('main/template/index', {
                    title: 'Category',
                    layout: 'share/template/promo/index',
                    user: req.user || null,
                    products: optProducts.orElse([])
                });
            }).catch(() => res.redirect('/'));
});

export default router;