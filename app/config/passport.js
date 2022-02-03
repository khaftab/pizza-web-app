const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user");
const bcrypt = require("bcrypt");

const init = (passport) => {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                // login
                // check email is exists or not
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, {
                        message: "No user with this email",
                    });
                }
                try {
                    const match = await bcrypt.compare(password, user.password);
                    if (match) {
                        done(null, user, { message: "Logged in succesfully" });
                    } else {
                        done(null, false, {
                            message: "Wrong username or password",
                        });
                    }
                } catch (error) {
                    done(null, false, { message: "Something went wrong" });
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user); // will add  user in req.user
        });
    });
};

module.exports = init;
