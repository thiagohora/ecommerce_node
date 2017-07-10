import ProductServ from 'admin/product/service/ProductServ';
import Product from 'admin/product/domain/Product';
import CategoryServ from 'admin/category/service/CategoryServ';
import uploadS3 from 'admin/infrastructure/aws/config'

const service = new ProductServ();
const categoryService = new CategoryServ();

export default function (router, isLoggedIn) {

    router.delete('/product/:id', isLoggedIn, (req, res) => {
        return service.delete(Object.assign({}, new Product(req.body), { id: req.params.id }))
                    .then(() => res.redirect('/admin/product'))
                    .catch(() => res.redirect(`/admin/product`));
    });

    router.get('/product', isLoggedIn, (req, res) => {
        return service.getAll().then(optProducts => {
            return res.render('admin/product/template/show', {
                title: 'Product',
                layout: 'admin/template/base/index',
                user: req.user || null,
                products : optProducts.orElse([])
            });
        }).catch(() => res.redirect('/admin'));
    });

    router.get('/product/new', isLoggedIn, (req, res) => {
        return categoryService.getAllEnable()
            .then(optCategories => res.render('admin/product/template/new', {
                                        title: 'Product',
                                        layout: 'admin/template/base/index',
                                        user: req.user || null,
                                        product: new Product(),
                                        categories: optCategories.orElse([])
                                    }))
            .catch((e) => { console.log(e); return res.redirect('/admin'); });
    });

    router.get('/product/edit/:id', isLoggedIn, (req, res) => {
        service.findById(req.params.id).then(product => {
            return categoryService.getAllEnable()
                    .then(optCategories => res.render('admin/product/template/edit', {
                                            title: 'Product',
                                            layout: 'admin/template/base/index',
                                            user: req.user || null,
                                            product,
                                            categories: optCategories.orElse([])
                                        }))
                    .catch(() => res.redirect('/admin'));;
        }).catch(() => res.redirect('/admin'));
    });

    router.post('/product', isLoggedIn, uploadS3.array('image', 1), (req, res) => {
        
        const product = new Product(req.body);
        
        if(req.files && req.files.length) {
            product.image = req.files && req.files[0] && req.files[0].location;
        }

        return service.save(product)
                        .then(() => res.redirect('/admin/product'))
                        .catch(error => { console.log(error); return res.redirect('/admin/product/new'); });
    });

    router.put('/product/:id', isLoggedIn, uploadS3.array('image', 1), (req, res) => {

        const product = Object.assign({}, new Product(req.body), { id: req.params.id })
        
        if(req.files && req.files.length) {
            product.image = req.files && req.files[0] && req.files[0].location;
        }

        return service.update(product)
                    .then(product => res.redirect('/admin/product'))
                    .catch(() => res.redirect(`/admin/product/${req.params.id}`));
    });

}