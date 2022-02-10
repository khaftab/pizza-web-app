const Order = require("../../../models/order");
module.exports = () => {
    return {
        async index(req, res) {
            let data;
            try {
                data = await Order.find({ status: { $ne: "completed" } }, null, {
                    // $ne means status != completed
                    sort: { createdAt: -1 },
                })
                    .populate("customerId", "-password")
                    .exec();
            } catch (error) {}
            if (req.xhr) {
                // checking wheather ajax call or not
                return res.status(200).json(data);
            }
            return res.render("admin/orders.ejs", { title: "Order details" });
        },
    };
};
