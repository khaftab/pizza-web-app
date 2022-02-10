const User = require("../../models/user");
const bcrypt = require("bcrypt");
const passport = require("passport");
module.exports = () => {
    const _getRedirectUrl = (req) => {
        return req.user.role === "customer" ? "/customer/orders" : "/admin/orders";
    };
    return {
        login(req, res) {
            res.render("auth/login.ejs", { title: "Login" });
        },
        register(req, res) {
            res.render("auth/register.ejs", { title: "Register" });
        },
        postLogin(req, res, next) {
            const { email, password } = req.body;
            if (!email || !password) {
                req.flash("error", "All fields are required");
                return res.redirect("/login");
            }
            passport.authenticate("local", (err, user, message) => {
                if (err) {
                    req.flash("error", message.message);
                    return next(err);
                }

                if (!user) {
                    req.flash("error", message.message);
                    return res.redirect("/login");
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash("error", message.message);
                        return next(err);
                    }
                    console.log(_getRedirectUrl(req));
                    return res.redirect(_getRedirectUrl(req));
                });
            })(req, res, next);
        },
        async postRegister(req, res) {
            const { name, email, password } = req.body;
            if (!name || !email || !password) {
                req.flash("error", "All fields are required");
                req.flash("name", name);
                req.flash("email", email);
                return res.redirect("/register");
            }

            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash("error", "User already exists");
                    req.flash("name", name);
                    req.flash("email", email);
                    return res.redirect("/register");
                }
            });

            // create user
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = User({
                name,
                email,
                password: hashedPassword,
            });
            try {
                await user.save();
                res.redirect("/login");
            } catch (error) {
                req.flash("error", "Something went wrong");
                return res.redirect("/register");
            }
        },
        logout(req, res) {
            req.logout();
            res.redirect("/login");
        },
    };
};
