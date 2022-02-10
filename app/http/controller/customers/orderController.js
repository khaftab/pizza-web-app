const Order = require("../../../models/order");
const moment = require("moment");
module.exports = () => {
    return {
        async store(req, res) {
            const { address, phone } = req.body;
            if (!phone || !address) {
                req.flash("error", "All fields are required");
                return res.redirect("/cart");
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address,
            });
            try {
                await order.save();
                delete req.session.cart;
                req.flash("success", "Order has been placed");
                res.header(
                    "Cache-Control",
                    "no-cache",
                    "private",
                    "no-store",
                    "must-revalidate",
                    "max-state=0",
                    "post-check=0",
                    "pre-check=0"
                ); // prevent storing cache in browser. In this case it is not necessary to wirte this line but sometimes if we toogle previous and next page then maybe order success alert can be popup
                res.redirect("/customer/orders");
            } catch (error) {
                req.flash("error", "Something went wrong");
                res.redirect("/cart");
            }
        },
        async index(req, res) {
            try {
                const orders = await Order.find({ customerId: req.user._id }, null, {
                    sort: { createdAt: -1 }, // decending order
                });
                res.render("customers/orders.ejs", {
                    orders: orders,
                    title: "Orders",
                    moment: moment, // Passing the moment library to the frontend
                });
            } catch (error) {
                console.log(error);
            }
        },
    };
};
