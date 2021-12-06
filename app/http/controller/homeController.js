const menu = require("../../models/menu")

module.exports = () => {
    return {
        async index(req, res, next) {
            try {
                const pizzas = await menu.find()
                res.render('home.ejs', { title: 'Realtime pizza', pizzas })
            } catch (error) {
                console.log(error)
                next(error)
            }
        }
    }
}