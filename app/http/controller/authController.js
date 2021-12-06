module.exports = () => {
    return {
        login(req, res) {
            res.render('auth/login.ejs', { title: 'Login' })
        },
        register(req, res) {
            res.render('auth/register.ejs', { title: 'Register' })
        }

    }
}