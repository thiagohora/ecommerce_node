import {Router} from 'express';
import CategoryServ from 'share/category/service/CategoryServ';
import ProductServ from 'product/item/service/ProductServ';



const router = Router();
const service = new CategoryServ();
const productServ = new ProductServ();

router.get('/:slug', (req, res) => {
    return service.findOne({ slug:req.params.slug })
                    .then(categoty => {
                        return productServ.findByCategory(categoty)
                                    .then(products =>  res.render('product/category/template/show', {
                                        title: 'Category',
                                        layout: 'share/template/main/index',
                                        user: req.user || null,
                                        products : products.orElse([])
                                    }))
                    }).catch(() => res.redirect('/'));
});

export default router;

