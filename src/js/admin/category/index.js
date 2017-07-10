import CategoryServ from 'admin/category/service/CategoryServ';
import Category from 'admin/category/domain/Category';

const service = new CategoryServ();

export default function (router, isLoggedIn) {

    router.delete('/category/:id', isLoggedIn, (req, res) => {
        console.log("ok");
        return service.delete(Object.assign({}, new Category(req.body), { id: req.params.id }))
                    .then(() => res.redirect('/admin/category'))
                    .catch(() => res.redirect(`/admin/category`));
    });

    router.get('/category', isLoggedIn, (req, res) => {
        return service.getAll().then(optCategories => {
            return res.render('admin/category/template/show', {
                title: 'Category',
                layout: 'admin/template/base/index',
                user: req.user || null,
                categories : optCategories.orElse([])
            });
        }).catch(() => res.redirect('/admin'));
    });

    router.get('/category/new', isLoggedIn, (req, res) => {
        return res.render('admin/category/template/new', {
            title: 'Category',
            layout: 'admin/template/base/index',
            user: req.user || null,
            category: {}
        });
    });

    router.get('/category/edit/:id', isLoggedIn, (req, res) => {
        service.findById(req.params.id).then(category => {
            return res.render('admin/category/template/edit', {
                        title: 'Category',
                        layout: 'admin/template/base/index',
                        user: req.user || null,
                        category
                    });
        }).catch(() => res.redirect('/admin'));
    });

    router.post('/category', isLoggedIn, (req, res) => {
        return service.save(new Category(req.body))
                        .then(() => res.redirect('/admin/category'))
                        .catch(() => res.redirect('/admin/category/new'));
    });

    router.put('/category/:id', isLoggedIn, (req, res) => {
        return service.update(Object.assign({}, new Category(req.body), { id: req.params.id }))
                    .then(category => res.redirect('/admin/category'))
                    .catch(() => res.redirect(`/admin/category/${req.params.id}`));
    });

}