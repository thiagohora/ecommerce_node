export default (req, res) => {
    req.logout();
    req.session.destroy(err => res.redirect('/'));
};