import CategoryServ from 'share/category/service/CategoryServ';

const categoryService = new CategoryServ();

export default (req, res, next) => {
     return categoryService.getAllEnable()
            .then(optCategories => {
                res.locals.categories = optCategories.orElse([]);
                return next();
            }).catch(next);
};