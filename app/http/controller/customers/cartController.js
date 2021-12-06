module.exports = () => {
    return {
        index(req, res) {
            res.render('customers/cart.ejs', { title: 'Cart' })
        },
        update(req, res) {
            /*
            let cart = {
                items: {
                    pizzaId: {item: pizzaObject, qty: 0}
                },
                totalQty: 0,
                totalPrice: 0
            } 
            Above is our cart structure
            */
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart

            // Check if a item is exists in the cart

            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            return res.status(201).json({ totalQty: req.session.cart.totalQty })
        }
    }
}