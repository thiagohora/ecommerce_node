import {Router} from 'express';
import CartVO from 'product/cart/domain/CartVO';
import CartServ from 'product/cart/service/CartServ';

const service = new CartServ();
const router = Router();

router.post('/', (req, res) => {
   return service.save(new CartVO(req.body.productId, req.user))
                    .then(cart => {
                        req.session.cart_id = cart._id;
                        return res.redirect(`/product/${req.body.slug}`)
                    })
                    .catch((e) => { console.log(e); return res.redirect(`/`); });
});

router.get('/:id', (req, res) => {
   return service.findById(req.params.id)
                    .then(cart =>  {
                        console.log(cart);
                        return res.render('product/cart/template/show', {
                                    title: 'Cart',
                                    layout: 'share/template/main/index',
                                    user: req.user || null,
                                    cart
                                });
                    })
                    .catch((e) => { console.log(e); return res.redirect(`/`); });
});

export default router;
