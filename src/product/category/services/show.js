export default (req, res) => {
   return res.render('product/category/template/show', {
        title: 'Category',
        layout: 'share/template/main/index',
        user: req.user || null
    });
};