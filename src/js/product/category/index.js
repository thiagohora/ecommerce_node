import {Router} from 'express';
import CategoryServ from 'product/category/service/CategoryServ';


const router = Router();
const service = new CategoryServ();

router.get('/:slug', (req, res) => {
    return service.getAllEnable()
            .then(optCategories => {
                return res.render('product/category/template/show', {
                    title: 'Category',
                    layout: 'share/template/main/index',
                    user: req.user || null,
                    categories: optCategories.orElse([])
                });
            }).catch(() => res.redirect('/'));
});

export default router;

