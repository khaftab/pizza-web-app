module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // it is provided by passport
        next();
    } else {
        res.redirect("/");
    }
};
