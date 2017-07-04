import {Router} from 'express';
import CategoryServ from 'share/category/service/CategoryServ';

const router = Router();
const categoryService = new CategoryServ();

router.get('/', (req, res) => {
     return categoryService.getAllEnable()
            .then(optCategories => {
                return res.render('main/template/index', {
                    title: 'Category',
                    layout: 'share/template/promo/index',
                    user: req.user || null
                });
            }).catch(() => res.redirect('/'));
});

export default router;