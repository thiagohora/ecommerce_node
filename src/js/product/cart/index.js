import {Router} from 'express';
import CartVO from 'product/cart/domain/CartVO';
import CartServ from 'product/cart/service/CartServ';

const service = new CartServ();
const router = Router();

router.post('/', (req, res) => {
    if(req.session.cart_id) {
        return service.addProduct(req.session.cart_id, req.body.productId).then(cart => {
            return res.redirect(`/product/${req.body.slug}`)
        }).catch((e) => { console.log(e); return res.redirect(`/`); });
    }
    return service.save(new CartVO(req.body.productId, req.user)).then(cart => {
        req.session.cart_id = cart._id;
        return res.redirect(`/product/${req.body.slug}`)
    }).catch((e) => { console.log(e); return res.redirect(`/`); });
});

router.delete('/:id', (req, res) => {
   return service.findById(req.params.id)
                    .then(cart => {
                        cart.products.pull({  _id: req.query.product_id });
                        cart.save();
                        if(!cart.products.length) {
                            return res.redirect('/');    
                        }
                        return res.redirect(`/cart/${req.params.id}`)
                    })
                    .catch((e) => { console.log(e); return res.redirect(`/`); });
});

router.get('/:id', (req, res) => {
    if(!res.locals.cart || !res.locals.cart.products || res.locals.cart.products.length == 0) {
        return res.redirect('/');
    }

    return res.render('product/cart/template/show', {
        title: 'Cart',
        layout: 'share/template/main/index',
        user: req.user || null
    });
});

export default router;
