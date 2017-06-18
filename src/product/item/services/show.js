export default (req, res) => {
   return res.render('product/item/template/show', {
        title: 'Product',
        layout: 'share/template/main/index',
        user: req.user || null
    });
};